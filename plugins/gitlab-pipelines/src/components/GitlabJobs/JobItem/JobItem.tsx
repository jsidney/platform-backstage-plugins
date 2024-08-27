import { Box, Tooltip, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { StatusComponent } from '../../StatusComponent';
import { truncateString } from '../../../utils/helpers';
import { JobActions } from '../JobActions';
import { GitlabPipelinesStatus } from '../../../utils/enums/GitlabPipelinesStatus';

type JobProps = {
  id: string,
  name: string,
  variable: string,
  status: GitlabPipelinesStatus
}

const useStyles = makeStyles(theme => ({
  job: {
    padding: '.8rem 3rem',
    background: 'transparent',
    border: `1px solid ${theme.palette.border}`,
    borderRadius: '30px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: theme.palette.text.primary,
    minWidth: '235px',
  },
  name:{
    cursor: 'pointer'
  },
  clickable: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.7rem'
  }
}));

export const JobItem = ({ id, name, variable, status}: JobProps) => {

  const classes = useStyles();

  return (
    <Box
      className={classes.job}
    >
      <StatusComponent
        status={status}
        icon
      />

      <Tooltip title={name} placement="top">
        <Typography
          className={classes.name}
        >
          {truncateString(name, 13)}
        </Typography>
      </Tooltip>

      <Box
        role="button"
        className={classes.clickable}>
        <JobActions
          id={id}
          variable={variable}
          status={status}
        />
      </Box>

    </Box>
  )
}
