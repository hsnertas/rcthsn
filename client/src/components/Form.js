import API from '../utils/API';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import Alert from './Alert'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function Form(props) {

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    description: '',
    weight: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = () => {
    // alert(`${values.amount} + ${values.description}`)
    let body = {
      "amount": parseInt(values.amount),
      "description": values.description
    }
    if (values.description && values.amount) {
      API.addBudgetData(props.userId, body);
      setTimeout(function () {
        window.location.reload();
      }, 200)
    } else {
      // alert("You must enter a value for both feilds");
      handleClickOpen()
    }


  }



  return (

    <>
      {/* <Alert
        open={open}
      /> */}
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
        {values.amount  /*regex*/ ?
          <Input
            id="standard-adornment-amount"
            error
            defaultValue="Error"
            onChange={(event) => setValues({ ...values, amount: event.target.value })}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name="amount"
          /> :
          <Input
            id="standard-adornment-amount"
            value={values.amount}
            onChange={(event) => setValues({ ...values, amount: event.target.value })}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name="amount"
          />
        }

        <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
        {values.description ?
          <Input
            id="standard-adornment-amount"
            error
            defaultValue="Error" z
            onChange={(event) => setValues({ ...values, description: event.target.value })}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name="description"
          /> :
          <Input
            id="standard-adornment-amount"
            value={values.description}
            onChange={(event) => setValues({ ...values, description: event.target.value })}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name="description"
          />
        }

        {values.description && values.amount ?
          <Button onClick={submitForm} variant="contained" color="primary" disableElevation style={{ marginTop: "20px" }}>
            Make Transaction
          </Button> :
          <Button onClick={submitForm} variant="contained" color="secondary" disableElevation style={{ marginTop: "20px" }}>
            Make Transaction
        </Button>
        }
      </FormControl>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You must enter a value for both feilds
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
