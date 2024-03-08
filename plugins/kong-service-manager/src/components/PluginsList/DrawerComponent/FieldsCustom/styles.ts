import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    heading: {
      width: '100%',
      fontSize: '1.2rem',
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    box: {
      margin: theme.spacing(2),
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      gap:'1rem'
    },
    label:{
      transform: 'initial',
      fontWeight: 'bold',
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      marginBottom:'.5rem',
      '&.Mui-focused': {
        color: theme.palette.text.primary,
      },
    },
    field: {
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '100%',
      marginTop: '-.5rem'
    },
    newField:{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '8px',
      background: theme.palette.background.default
    },
    labelAndField:{
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem'
    },
    emptyField:{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    defaultField:{
      width: '100%',
      fontSize: '1.2rem',
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addField:{
      width: 'auto',
      color: theme.palette.link,
      padding: '.5rem 1rem',
      border: `1px solid ${theme.palette.link}`,
      marginBottom: '1rem',
    },
    input: {
      minWidth: '95%',
      borderRadius: theme.shape.borderRadius,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: theme.typography.body1.fontSize,
      '&:focus': {
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      },
    },
    accordion:{
      width: '100%'
    },
    accordionSummary:{
      background: theme.palette.divider,
    },
    accordionContent:{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: theme.palette.background.default,
      gap: '.8rem',
      padding: '1rem .7rem'
    },
    combobox:{
        width: '95%',
      },
    select: {
      width: '100%',
    },
    tags:{
      width: '98%',
      marginTop: '-.5rem'
    },
    buttonsGroup:{
      width: '30%',
      textAlign: 'center'
    }
  }));