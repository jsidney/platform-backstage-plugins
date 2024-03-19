import React, { ReactNode, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box,makeStyles } from '@material-ui/core';
import { GitlabPipelinesContext } from '../context/GitlabPipelinesContext';
import { validateString } from '../../utils/validators';
import TextFieldComponent from './TextFieldComponent/TextFieldComponent';

type ModalComponentProps = {
  open: boolean,
  modalType: "Pipeline" | "Job",
  title: string,
  subtitle: ReactNode,
  handleModal: () => void,
  handleStartAction: () => Promise<void>
}

const useStyles = makeStyles((theme) => ({ 
  modal: {
    width: '100%',
    padding: '4rem',
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem'
  },
  InputField:{
    width:'100%'
  },
  footer: {
    padding: '0 1.5rem 1.8rem 0'
  }
}));

export const ModalComponent = ({ open, title, subtitle, handleModal, handleStartAction, modalType }: ModalComponentProps) => {

  const [errorsState, setErrorsState] = useState<Record<string, boolean>>({});
  const classes = useStyles();
  const {jobParams, setJobParams, setVariablesParams } = useContext(GitlabPipelinesContext);

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, required: boolean, type: string | number | boolean) => {
    if (required) {
      if (type === "string" && validateString(event.target.value as string)) {
       setErrorsState({ ...errorsState, [event.target.name!]: true });
      }
      if (event.target.value === "")  setErrorsState({ ...errorsState, [event.target.name!]: true });
    }
    if (event) {
      if(modalType === "Job"){
        if (event.target.name === "jobVariableKey") {
          setJobParams({
            key: event.target.value as string,
            value: jobParams?.value ?? ""
          });
          setErrorsState({ ...errorsState, [event.target.name!]: false });
        }
        if (event.target.name === "jobVariableValue") {
          setJobParams({
            key: jobParams?.key ?? "", 
            value: event.target.value as string
          });
          setErrorsState({ ...errorsState, [event.target.name!]: false });
        }
      }
    }
  };

  const touchedField = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, required: boolean) => {
    if (required && event.target.value === "") setErrorsState({ ...errorsState, [event.target.name!]: true })
    return;
  }

  const handleSetInputs = () => {
    handleModal();
    if (!!handleStartAction) handleStartAction();
  }

  return (
    <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent className={classes.modal}>
        <Box>
          {subtitle}
        </Box>
        <>
          {modalType === "Pipeline" && (
            <Box className={classes.InputField}>
              <TextFieldComponent
               setVariables={setVariablesParams}
               setError={setErrorsState}
               errors={errorsState}
              />
            </Box>
          )}

          {modalType === "Job" && (
            <>
              <TextField
                margin="dense"
                id="jobVariableKey"
                name="jobVariableKey"
                defaultValue={jobParams?.key ?? ''}
                required
                label="Insert the variable name"
                type="string"
                fullWidth
                onBlur={(event) => touchedField(event, true)}
                onChange={(event) => handleChange(event, true, 'string')}
                error={errorsState.jobVariableKey}
                helperText={
                  errorsState.jobVariableKey
                    ? 'use at least 3 characters'
                    : null
                }
              />

              <TextField
                margin="dense"
                id="jobVariableValue"
                name="jobVariableValue"
                defaultValue={jobParams?.value ?? ''}
                required
                label="Insert the variable value"
                type="string"
                fullWidth
                onBlur={(event) => touchedField(event, true)}
                onChange={(event) => handleChange(event, true, 'string')}
                error={errorsState.jobVariableValue}
                helperText={
                  errorsState.jobVariableValue
                    ? 'use at least 3 characters'
                    : null
                }
              />
            </>
          )}


        </>
      </DialogContent>
      <DialogActions className={classes.footer}>
        <Button onClick={handleModal} color="primary">
          Cancel
        </Button>
        <Button
          disabled={Object.values(errorsState).some((error) => error)}
          onClick={handleSetInputs}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
