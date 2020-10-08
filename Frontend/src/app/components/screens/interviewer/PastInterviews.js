import React from 'react'
import {withRouter} from 'react-router-dom'

import {Add} from '@material-ui/icons'
import {Fab} from '@material-ui/core';

import FloatingAction from '../../atoms/FloatingAction';


function PastInterviews(props){

    return(
    
        <div>
            Past Interviews
            <FloatingAction icon={Add} text="Add Interview Room" onClick={()=>{props.history.push('createRoom')}}/>
        </div>
    )
}

export default withRouter(PastInterviews);