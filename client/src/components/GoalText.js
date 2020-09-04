import React from 'react'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';


export default function GoalText(props) {
    const [values, setValues] = React.useState({
        amount: '',
        description: '',
      }); 

    return (
        <div style={{display: 'inline'}}>
        
          <Divider />

        </div>
    )
}
