import React, { useEffect, useState } from 'react';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Tooltip } from '@material-ui/core';
import { WorkflowResultsProps } from '../../../utils/types';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../../hooks';
import { ModalComponent } from '../ModalComponent';
import { IoMdTime } from "react-icons/io";
import { useWorkflowActionsStyles } from './styles';
import { WorkFlowActionsProps } from './types';
import { useGithuWorkflowsContext } from '../../context';

export const WorkFlowActions: React.FC<WorkFlowActionsProps> = ({ workflowId, status, conclusion, parameters }) => {
  const { entity } = useEntity();
  const { projectName, hostname } = useEntityAnnotations(entity as Entity);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [workFlowSelected, setWorkFlowSelected] = useState<WorkflowResultsProps>();
  const { inputsWorkflowsParams, workflowsState, setWorkflowsState, handleStartWorkflowRun, handleStopWorkflowRun, listAllWorkflows } = useGithuWorkflowsContext();
  const { buttonWait, waitResponse, inProgress } = useWorkflowActionsStyles();
  const errorApi = useApi(errorApiRef);

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const updateWorkflowState = (workflowIdParam: number) => {
    // eslint-disable-next-line prefer-const
    let intervalId: NodeJS.Timeout;
  
    const checkWorkflowStatus = async () => {
      const workflows = await listAllWorkflows(hostname, projectName);

      if (workflows) {
        const workflowNewState = workflows.find(w => w.id === workflowIdParam);
        if (workflowNewState) {
          setWorkflowsState((prevWorkflowsState) => {
            if (prevWorkflowsState) {
              const updatedWorkflows = prevWorkflowsState.map((workflow) => {
                if (workflow.id === workflowNewState.id) {
                  return {
                    ...workflow,
                    lastRunId: workflowNewState.lastRunId,
                    status: workflowNewState.status,
                    conclusion: workflowNewState.conclusion,
                  };
                }
                return workflow;
              });
              return updatedWorkflows;
            }
            return prevWorkflowsState;
          });
  
          if (workflowNewState.status === StatusWorkflowEnum.completed) {
            clearInterval(intervalId);
          }

        }
      }
    };
    intervalId = setInterval(checkWorkflowStatus, 2000); 
  };
  
  const handleStartWorkflow = async () => {
    if (status === StatusWorkflowEnum.pending || status === StatusWorkflowEnum.queued) return;
  
    setWorkflowsState((prevWorkflowsState) => {
      if (prevWorkflowsState) {
        const updatedWorkflows = prevWorkflowsState.map((workflow) => {
          if (workflow.id === workFlowSelected?.id) {
            return {
              ...workflow,
              status: StatusWorkflowEnum.queued,
              conclusion: undefined,
            };
          }
          return workflow;
        });
        return updatedWorkflows;
      }
      return prevWorkflowsState;
    });

    const response = await handleStartWorkflowRun(hostname, projectName, workFlowSelected?.id as number);
    if (response && workFlowSelected && workFlowSelected.id) { 
      /**
       *  Force a timeout to compensate for the github API delay
       */
       setTimeout(()=>{
        updateWorkflowState(workFlowSelected.id as number)
       },10000)
    }
  };
  

  const handleClickActions = async (statusParams: string): Promise<void> => {
    try {
      if (workFlowSelected) {
        switch (statusParams) {
          case StatusWorkflowEnum.completed:
          case StatusWorkflowEnum.success:
          case StatusWorkflowEnum.failure:
          case StatusWorkflowEnum.aborted:
          case StatusWorkflowEnum.skipped:
          case StatusWorkflowEnum.canceled:
          case StatusWorkflowEnum.timeOut:
          case StatusWorkflowEnum.default:
            if (parameters && parameters.length > 0 && !inputsWorkflowsParams) {
              return setShowModal(true);
            }
            return handleStartWorkflow();
          case StatusWorkflowEnum.inProgress:
            await handleStopWorkflowRun(hostname, projectName, workFlowSelected.lastRunId as number);
            setWorkflowsState((prevWorkflowsState) => {
              if (prevWorkflowsState) {
                const updatedWorkflows = prevWorkflowsState.map((workflow) => {
                  if (workflow.id === workFlowSelected.id) {
                    return {
                      ...workflow,
                      status: StatusWorkflowEnum.completed,
                      conclusion: StatusWorkflowEnum.canceled,
                    };
                  }
                  return workflow;
                });
                return updatedWorkflows;
              }
              return prevWorkflowsState;
            });
            return Promise.resolve();
          default:
            break;
        }
      }
    } catch (e: any) {
      errorApi.post(e);
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (workflowsState) {
      const workFlowFilter = workflowsState.find((w: WorkflowResultsProps) => w.id === workflowId);
      setWorkFlowSelected(workFlowFilter);
    }
  }, [workflowsState, workflowId]);

  if (!status) return null;

  return (
    <>
      {status.toLocaleLowerCase() === StatusWorkflowEnum.queued && (
        <Tooltip title="Please wait" placement="right">
          <button className={buttonWait} disabled>
            <IoMdTime
              className={waitResponse}
              onClick={() => handleClickActions(StatusWorkflowEnum.queued)}
            />
          </button>
        </Tooltip>
      )}

      {status.toLocaleLowerCase() === StatusWorkflowEnum.inProgress && (
        <Tooltip title="Stop" placement="right">
          <RefreshIcon
            className={inProgress}
            onClick={() => handleClickActions(StatusWorkflowEnum.inProgress)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.skipped) && (
        <Tooltip title="Try again" placement="right">
          <HighlightOffIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.skipped)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.canceled) && (
        <Tooltip title="Try again" placement="right">
          <HighlightOffIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.canceled)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.timeOut) && (
        <Tooltip title="Re-run" placement="right">
          <TimerIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.timeOut)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.aborted) && (
        <Tooltip title="Re-run" placement="right">
          <TimerIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.timeOut)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.failure) && (
        <Tooltip title="Re-run" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.failure)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.success) && (
        <Tooltip title="Re-run" placement="right">
          <SyncIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.success)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.completed) && (
        <Tooltip title="Re-run" placement="right">
          <SyncIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.success)}
          />
        </Tooltip>
      )}

      {(status.toLocaleLowerCase() === StatusWorkflowEnum.completed && conclusion?.toLocaleLowerCase() === StatusWorkflowEnum.default) && (
        <Tooltip title="Run Workflow" placement="right">
          <ReplayIcon
            onClick={() => handleClickActions(StatusWorkflowEnum.success)}
          />
        </Tooltip>
      )}

      {
        showModal && (
          <ModalComponent
            open={showModal}
            handleModal={handleShowModal}
            parameters={parameters ? parameters : []}
            handleStartWorkflow={handleStartWorkflow}
          />
        )
      }
    </>
  );
};
