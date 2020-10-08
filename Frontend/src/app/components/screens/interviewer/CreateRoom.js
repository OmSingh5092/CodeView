import React from 'react';
import {withRouter} from 'react-router-dom'

import {Typography,Fab} from '@material-ui/core'
import {Done} from '@material-ui/icons'

import CreateRoomForm from '../../molecules/CreateRoomForm';
import FloatingAction from '../../atoms/FloatingAction';


function CreateRoomScreen(props){

    return(
        <div style={{display:"flex", flexDirection:"column",alignContent:"center"}} >
            
            <div style={{display:"flex", justifyContent:"center"}}>
                <CreateRoomForm/>
                
            </div>
            <FloatingAction icon = {Done} text="Create" onClick={()=>{}}/>
            
            
        </div>
    )
}

export default withRouter(CreateRoomScreen);