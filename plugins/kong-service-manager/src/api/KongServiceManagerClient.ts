import { ConfigApi, FetchApi } from "@backstage/core-plugin-api";
import { KongServiceManagerApi, Options } from "./KongServiceManagerApi";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, IKongPluginSpec, ISpec, PluginFieldsResponse, PluginPerCategory, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { PluginsInfoData } from "../data/data";
import { PullRequestManager } from "./pullRequestManager";
import { formatObject } from "../utils/helpers/formactObject";

 abstract class Client {
    protected readonly config: ConfigApi;
    private readonly fetchApi: FetchApi;
    pullRequestManager: PullRequestManager;
    
    constructor(opts: Options) { 
        this.config = opts.config as ConfigApi; 
        this.fetchApi = opts.fetchApi as FetchApi;
        this.pullRequestManager = new PullRequestManager(opts.scmAuthApi,opts.config)
    }

    protected async fetch <T = any>(input: string, init?: RequestInit): Promise<T> {

        const apiUrl = `${this.config.getString("backend.baseUrl")}/api/kong`;

        const resp = await this.fetchApi.fetch(`${apiUrl}${input}`, {
            ...init
        });

        if (!resp.ok) {
            throw new Error(`[${resp.type}] Request failed with ${resp.status} - ${resp.statusText}`);
        }
        if (resp.status === 204) return { message: "deleted" } as any

        return await resp.json();
    }
}

export class KongServiceManagerApiClient extends Client implements KongServiceManagerApi {


    async getServiceInfo(instanceName: string, serviceName:string): Promise<ServiceInfoResponse> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}`)
        return response.service
    }

    async getEnabledPlugins(instanceName:string,serviceName: string, searchFilter?:string): Promise<PluginPerCategory[]> {
        const response = await this.fetch(`/${instanceName}/plugins`);   

        const availablePluginsResponse = response.plugins as string[];
        let availablePluginsList = availablePluginsResponse;

        if (searchFilter !== "" && searchFilter) {
            availablePluginsList = availablePluginsResponse.filter(plugin =>
              plugin.toLowerCase().includes(searchFilter.toLowerCase())
            );
          }
          
        const associatedPluginsList = await this.getServiceAssociatedPlugins(instanceName,serviceName)

        const mapedEnabledPluginsList = PluginsInfoData.categories.map((category) => {

            return {
                category: category.category,
                plugins: category.plugins.flatMap((categoryPlugin) => {
                    const filteredPluginMatch = availablePluginsList.find((availablePlugin) => availablePlugin === categoryPlugin.slug)
                    if (!filteredPluginMatch) return []
    
                    const filteredAssocietedPluginMatch = associatedPluginsList.find((associatedPlugin) => associatedPlugin.name === categoryPlugin.slug)
                    return {
                        id: filteredAssocietedPluginMatch?.id ?? null,
                        name: categoryPlugin.name,
                        slug: categoryPlugin.slug,
                        associated: filteredAssocietedPluginMatch?.enabled ?? false,
                        image: categoryPlugin.image,
                        tags: categoryPlugin.tags,
                        description: categoryPlugin.description
                    }
                })
            }
        })
        return mapedEnabledPluginsList

    }


    async getPluginFields(instanceName:string, pluginName:string): Promise<PluginFieldsResponse[]> {
        const response = await this.fetch(`/${instanceName}/services/plugins/${pluginName}/fields`)
        return response.fields
    }

    async getServiceAssociatedPlugins(instanceName:string,serviceName:string): Promise<AssociatedPluginsResponse[]> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/associated`)
        return response.plugins
    }

    async createServicePlugin(instanceName:string, serviceName:string, config: CreatePlugin): Promise<any> {
        const body = {
            config
        }
        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
            'Content-Type': 'application/json', 
          }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins`,headers)
        return response
    }

    async editServicePlugin(instanceName:string,serviceName: string, pluginId: string, config: CreatePlugin): Promise<any> {
        const body = {
            ...config
        }
        const headers: RequestInit = {
         method: "PATCH",
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json', 
         }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/${pluginId}`, headers)
        return response

    }

    async removeServicePlugin(instanceName:string,serviceName: string, pluginId: string): Promise<any> {

        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/${pluginId}`, headers)
        return response.message
    }

    async getRoutesFromService(instanceName:string, serviceName: string): Promise<RouteResponse[]> {  
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes`)
        return response.routes
    }

    async getRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<RouteResponse> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`);
        return response.route;
    }

    async createRouteFromService(instanceName:string, serviceName: string, config: CreateRoute): Promise<any> {
        const body = {
            config,
         }
        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json', 
         }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes`,headers)
        return response.route
    }

    async editRouteFromService(instanceName:string, serviceName: string, routeId: string, config: CreateRoute): Promise<any> {
        const body = { 
            config,
         }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json', 
            }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`,headers)
        return response
    }

    async removeRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<any> {
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`, headers)
        return response.message
    }

    async getSpecs(kind:string,entityName:string) : Promise<ISpec[]>{
        const response = await this.fetch(`/${kind}/${entityName}/specs`);
        return response.specs as ISpec[];
    }

    async getPluginsFromSpec(entityName:string):Promise<IKongPluginSpec[]>{
        const response = await this.fetch(`/spec/${entityName}/plugins`);
        return response.plugins as IKongPluginSpec[]
    }


    async applyPluginsToSpec(specName:string, title: string, message: string,location: string, plugins: IKongPluginSpec[]){
        const body = {
            plugins,
         }
        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json', 
         }
        }
        const response = await this.fetch(`/add-plugins/${specName}`,headers);

        // eslint-disable-next-line no-console
        console.log('SPEC IN OBJECT',response)

        const fileContent = formatObject(response.spec);

        // eslint-disable-next-line no-console
        console.log('FILE CONTENT >> ',fileContent)
        
        return this.pullRequestManager.createPullRequest(
            location,
            fileContent,
            title,
            message
        )
    }

}