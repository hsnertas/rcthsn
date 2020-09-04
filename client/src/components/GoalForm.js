import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Form from './Form';
import Thermometer from 'react-thermometer-component'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../utils/API';
import Alert from './Alert'
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },
});

export default function GoalForm(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    amount: '',
    description: '',
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
        "goal":parseInt(values.amount),
        "saved":props.balance,
        "description":values.description
    }
    if(values.amount && values.description){
      API.updateGoal(props.userId,body);
      setTimeout(function(){
        window.location.reload();
     }, 200)
    }else(
      handleClickOpen()
    );
    
}
console.log(props)
  return (
      <>
         {/* <Alert
          open={open}
        /> */}
    <Card className={classes.root} style={{backgroundColor: "#f7e9b0"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.goal.description == null ? `Goal : Enter a goal below` : `Goal : ${props.goal.description}`}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          </Typography>
          <Divider />
          <TextField
          id="standard-textarea"
          label={`${props.goal.description}`}
          placeholder="New Description"
          onChange={(event) => setValues({...values, description: event.target.value})}
          multiline
        />
        <TextField
          id="standard-textarea"
          label={`$ ${props.goal.goal}`}
          placeholder="New Amount"
          onChange={(event) => setValues({...values, amount: event.target.value})}
          multiline
        />

        { values.amount && values.description ? 
          <Button onClick={submitForm}variant="contained" color="primary" disableElevation style={{marginTop: "20px"}}>
                    Update your Goal
        </Button> :
        <Button onClick={submitForm}variant="contained" color="secondary" disableElevation style={{marginTop: "20px"}}>
             Update your Goal
        </Button>   
        }
        </CardContent>
    </Card>
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
   
  );
}
