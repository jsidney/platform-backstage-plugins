/* eslint-disable @backstage/no-undeclared-imports */
import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
import { ScmAuthApi } from '@backstage/integration-react';
import { Branches, Jobs, WorkflowDispatchParameters, WorkflowResponseFromApi, WorkflowRun, WorkflowRunsResponseFromApi } from './utils/types';
import YAML from "js-yaml"
import { StatusWorkflowEnum } from './utils/enums/WorkflowListEnum';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

const GITHUB_WORKFLOWS_DEFAULT_PROXY_URL = "/github/api"

export interface Workflows {
    workflow: {
        id: number
        name: string
        state: string
        url: string
        path: string
        createdAt: string
        updatedAt: string
    },
    latestRun: {
        id?: number
        status?: string
        conclusion?: string
    },
    parameters: WorkflowDispatchParameters[]
}

export interface GithubWorkflowsApi {
    /**
    * list workflows
    * possible to filter by workflow file name
    * Ex filter => ["application-dashboards.yaml", "another.yaml"]
    */
    listWorkflows(githubRepoSlug: string, branch: string, filter?: string[]): Promise<Workflows[]>;
    /**
    * list branches from a repository
    */
    listBranchesFromRepo(githubRepoSlug: string): Promise<Branches[]>;
    /**
    * dispatch a run from a branch of a workflow
    */
    startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string, inputs?: object): Promise<WorkflowRun>;
    /**
    * stop a run from a worflow
    */
    stopWorkflowRun(runId: string, githubRepoSlug: string): Promise<void>;
    /**
    * list all jobs from a workflow run
    */
    listJobsForWorkflowRun(githubRepoSlug: string, workflowId: number,pageSize?:number,page?:number): Promise<Jobs>;
    /**
     *  get a workflow by id
     */
    getWorkflowRunById(runId: string, githubRepoSlug: string): Promise<WorkflowRun>
    /**
     *  download job logs
     */
    downloadJobLogsForWorkflowRun(githubRepoSlug: string, jobId: number): Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']>
    /**
     *  list all environments
     */
    getEnvironmentsList(githubRepoSlug: string) : Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']>
}

export const githubWorkflowsApiRef = createApiRef<GithubWorkflowsApi>({
    id: 'plugin.githubworkflows',
});

export type Options = {
    discoveryApi: DiscoveryApi;
    scmAuthApi: ScmAuthApi;
    /**
    * Path to use for requests via the proxy, defaults to /github/api
    */
    proxyPath?: string;
};

const regexFileName = (input: string) => {
    const fileName = input.match(/(?:[\w\d\-\.](?!\/))+$/) ?? ""
    return fileName[0]
}

class Client {
  private readonly discoveryApi: DiscoveryApi;
  private readonly proxyPath: string;
  private readonly scmAuthApi: ScmAuthApi;

  constructor(opts: Options) {
    this.discoveryApi = opts.discoveryApi;
    this.scmAuthApi = opts.scmAuthApi;
    this.proxyPath = opts.proxyPath ?? GITHUB_WORKFLOWS_DEFAULT_PROXY_URL;
  }

  public async fetch<T = any>(
    input: string,
    githubRepoSlug: string,
    init?: RequestInit,
  ): Promise<T> {
    const { token } = await this.scmAuthApi
      .getCredentials({
        url: `https://github.com/`,
        additionalScope: {
          customScopes: {
            github: ['repo'],
          },
        },
      })
      .catch(_error => {
        throw new Error(
          'Impossible list github workflows - failed authentication',
        );
      });

    const apiUrl = await this.apiUrl(githubRepoSlug);

    const resp = await fetch(`${apiUrl}${input}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    if (!resp.ok) {
      throw new Error(
        `Request failed with ${resp.status} - ${(await resp.json()).message}`,
      );
    }

    if (resp.status === 204) return { ok: true } as any;
    return await resp.json();
  }

  async apiUrl(githubRepoSlug: string) {
    const baseUrl = await this.discoveryApi.getBaseUrl('proxy');
    return `${baseUrl}${this.proxyPath}/${githubRepoSlug}`;
  }

  async listWorkflows(githubRepoSlug: string, filter?: string[]) {
    const response = await this.fetch<WorkflowResponseFromApi>(
      '/actions/workflows',
      githubRepoSlug,
    );
    if (!filter || filter.length === 0) return response.workflows;
    const filteredWorkflows = response.workflows.filter(workflow =>
      filter.includes(regexFileName(workflow.path)),
    );
    return filteredWorkflows;
  }

  async listWorkflowRuns(workflowId: string, githubRepoSlug: string) {
    const response = await this.fetch<WorkflowRunsResponseFromApi>(
      `/actions/workflows/${workflowId}/runs`,
      githubRepoSlug,
    );
    return response.workflow_runs;
  }

  async listWorkflowRunsTotalCount(workflowId: string, githubRepoSlug: string) {
    const response = await this.fetch<WorkflowRunsResponseFromApi>(
      `/actions/workflows/${workflowId}/runs`,
      githubRepoSlug,
    );
    return response;
  }

  async listBranchesFromRepo(githubRepoSlug: string) {
    return await this.fetch<Branches[]>('/branches', githubRepoSlug);
  }

  async getWorkflowRunById(runId: string, githubRepoSlug: string) {
    return await this.fetch<WorkflowRun>(
      `/actions/runs/${runId}`,
      githubRepoSlug,
    );
  }

  async getLatestWorkflowRun(workflowId: string, githubRepoSlug: string) {
    const response = await this.fetch<WorkflowRunsResponseFromApi>(
      `/actions/workflows/${workflowId}/runs`,
      githubRepoSlug,
    );
    return response.workflow_runs[0];
  }

  async startWorkflow(
    workflowId: string,
    githubRepoSlug: string,
    branch: string,
    inputs?: object,
  ) {
    const body: { ref: string; inputs?: object } = {
      ref: branch,
    };
    if (inputs) body.inputs = inputs;
    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    const totalWorkflowRunsBefore = await this.listWorkflowRunsTotalCount(
      workflowId,
      githubRepoSlug,
    );
    let totalWorkflowRunsAfter = totalWorkflowRunsBefore;
    let loadTime = 3000;

    await this.fetch(
      `/actions/workflows/${workflowId}/dispatches`,
      githubRepoSlug,
      headers,
    );
    do {
      await this.waitTime(loadTime);
      totalWorkflowRunsAfter = await this.listWorkflowRunsTotalCount(
        workflowId,
        githubRepoSlug,
      );
      loadTime = loadTime * 2 + 1000;
    } while (
      totalWorkflowRunsAfter.total_count === totalWorkflowRunsBefore.total_count
    );
    return totalWorkflowRunsAfter.workflow_runs[0];
  }

  async waitTime(time: number) {
    return await new Promise(r => setTimeout(r, time));
  }

  async stopWorkFlowRun(runId: string, githubRepoSlug: string) {
    const inProgress = [
      'in_progress',
      'queued',
      'requested',
      'waiting',
      'pending',
    ];
    const runStatus = await this.getWorkflowRunById(runId, githubRepoSlug);
    if (!inProgress.includes(runStatus.status))
      throw new Error('Impossible to stop this run, not in progress!');
    const headers: RequestInit = {
      method: 'POST',
    };
    const response = await this.fetch(
      `/actions/runs/${runId}/cancel`,
      githubRepoSlug,
      headers,
    );
    return response;
  }

  async getFileContentFromPath(
    githubRepoSlug: string,
    filePath: string,
    branch: string,
  ) {
    const response = await this.fetch(
      `/contents/${filePath}${branch ? `?ref=${branch}` : ''}`,
      githubRepoSlug,
    );
    const yamlContent = YAML.load(
      Buffer.from(response.content, 'base64').toString('utf8'),
    ) as any;
    return yamlContent;
  }

  async listWorkflowsDispatchParameters(
    githubRepoSlug: string,
    filePath: string,
    branch: string,
  ) {
    const yamlContent = await this.getFileContentFromPath(
      githubRepoSlug,
      filePath,
      branch,
    );
    if (!yamlContent.on?.workflow_dispatch?.inputs) return [];
    const inputs = yamlContent.on.workflow_dispatch?.inputs;

    const mapedInputs: WorkflowDispatchParameters[] = Object.keys(inputs).map(
      input => {
        const currentInput = inputs[input];
        const result: WorkflowDispatchParameters = {
          name: input,
          description: currentInput.description ?? '',
          default: currentInput.default ?? '',
          required: currentInput.required ?? false,
          type: currentInput.type ?? 'string',
        };
        if (currentInput.type === 'choice') {
          result.options = currentInput.options;
        }
        return result;
      },
    );
    return mapedInputs;
  }

  async listWorkflowsResponse(
    githubRepoSlug: string,
    branch: string,
    filter?: string[],
  ) {
    const workflows = await this.listWorkflows(githubRepoSlug, filter);
    const response = await Promise.all(
      workflows.map(async (workflow): Promise<Workflows> => {
        const latestWorkflowRun = await this.getLatestWorkflowRun(
          workflow.id.toString(),
          githubRepoSlug,
        );
        const dispatchParameters = await this.listWorkflowsDispatchParameters(
          githubRepoSlug,
          workflow.path,
          branch,
        );
        const latestWorkflowRunData = latestWorkflowRun
          ? {
              id: latestWorkflowRun.id,
              status: latestWorkflowRun.status,
              conclusion: latestWorkflowRun.conclusion,
            }
          : {
              status: StatusWorkflowEnum.completed,
              conclusion: StatusWorkflowEnum.failure,
            };
        return {
          workflow: {
            id: workflow.id,
            name: workflow.name,
            state: workflow.state,
            url: workflow.html_url,
            path: workflow.path,
            createdAt: workflow.createdAt,
            updatedAt: workflow.updatedAt,
          },
          latestRun: latestWorkflowRunData,
          parameters: dispatchParameters,
        };
      }),
    );
    return response;
  }

  async listJobsForWorkflowRun(githubRepoSlug: string, id: number) {
    const response = await this.fetch<any>(
      `/actions/runs/${id}/jobs`,
      githubRepoSlug,
    );
    return response;
  }

  async downloadJobLogsForWorkflowRun(githubRepoSlug: string, jobId: number) {
    const hostname = 'github.com';
    const owner = githubRepoSlug.split('/')[0];
    const repo = githubRepoSlug.split('/')[1];

    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}/`,
      additionalScope: {
        customScopes: {
          github: ['repo'],
        },
      },
    });

    const octokit = new Octokit({
      auth: token,
    });

    const response = await octokit.request(
      `GET /repos/${githubRepoSlug}/actions/jobs/${jobId}/logs`,
      {
        owner,
        repo,
        job_id: jobId,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    return response.data;
  }

  async getEnvironmentsList(githubRepoSlug: string) : Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']> {
    const hostname = 'github.com';
    const owner = githubRepoSlug.split('/')[0];
    const repo = githubRepoSlug.split('/')[1];

    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}/`,
      additionalScope: {
        customScopes: {
          github: ['repo'],
        },
      },
    });

    const octokit = new Octokit({
      auth: token,
    });

    const response = await octokit.request(
      `GET /repos/${githubRepoSlug}/environments`,
      {
        owner,
        repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    return response.data;
  }
}

export class GithubWorkflowsApiClient implements GithubWorkflowsApi {

    private readonly client: Client;

    constructor(opts: Options) {
        this.client = new Client(opts);
    }
    
    async listWorkflows(githubRepoSlug: string, branch: string, filter?: string[]): Promise<Workflows[]> {
        return this.client.listWorkflowsResponse(githubRepoSlug, branch, filter)
    }

    async listBranchesFromRepo(githubRepoSlug: string): Promise<Branches[]> {
        return this.client.listBranchesFromRepo(githubRepoSlug)
    }

    async startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string, inputs?: object): Promise<WorkflowRun> {
        return this.client.startWorkflow(workflowId, githubRepoSlug, branch, inputs)
    }

    async stopWorkflowRun(runId: string, githubRepoSlug: string): Promise<void> {
        return this.client.stopWorkFlowRun(runId, githubRepoSlug)
    }
    // check pageSize and page params
    async listJobsForWorkflowRun(githubRepoSlug: string, id:number): Promise<Jobs> {
        return this.client.listJobsForWorkflowRun(githubRepoSlug, id)
    }
    async getWorkflowRunById(runId: string, githubRepoSlug: string) {
        return this.client.getWorkflowRunById(runId,githubRepoSlug)
    }
    async downloadJobLogsForWorkflowRun(githubRepoSlug: string, jobId:number):Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']>{
        return this.client.downloadJobLogsForWorkflowRun(githubRepoSlug,jobId)
    }
    async getEnvironmentsList(githubRepoSlug: string):Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']>{
        return this.client.getEnvironmentsList(githubRepoSlug)
    }
}

