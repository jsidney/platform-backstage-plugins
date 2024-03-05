import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    box: {
      margin: theme.spacing(2),
      width: '100%',
    },
    label:{
      color: theme.palette.text.primary
    },
    field: {
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '100%',
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    emptyField:{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    addField:{
      width: 'auto',
      color: theme.palette.link,
      padding: '.5rem 1rem',
      border: `1px solid ${theme.palette.link}`,
      marginBottom: '1rem'
    },
    input: {
      minWidth: '95%',
    },
  }));