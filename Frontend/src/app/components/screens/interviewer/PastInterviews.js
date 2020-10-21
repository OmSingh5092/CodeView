import React from 'react'
import {withRouter} from 'react-router-dom'

import {Add} from '@material-ui/icons'
import {Fab, Typography} from '@material-ui/core';

import FloatingAction from '../../atoms/FloatingAction';


function PastInterviews(props){

    return(
    
        <div style={{margin:20}}>
            <Typography variant ="h4">
                Past Interviews
            </Typography>
            
            <FloatingAction icon={Add} text="Add Interview Room" onClick={()=>{props.history.push('createRoom')}}/>
        </div>
    )
}

export default withRouter(PastInterviews);