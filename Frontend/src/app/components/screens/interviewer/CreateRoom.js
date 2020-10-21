import React from 'react';
import {withRouter} from 'react-router-dom'

import {Typography,Fab} from '@material-ui/core'
import {Done} from '@material-ui/icons'

import CreateRoomForm from '../../molecules/CreateRoomForm';
import FloatingAction from '../../atoms/FloatingAction';

import {createRoom} from '../../../utils/api/controllers/roomCtrl'


function CreateRoomScreen(props){
    var data ={
        title:"",
        fields:{}
    }

    const handleSubmit = ()=>{
        createRoom(data).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){

                console.log("Room Created!", res.room);
                props.history.push('../room/'+res.room._id);
            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }

    return(
        <div style={{display:"flex", flexDirection:"column",alignContent:"center", margin:20}} >

            <Typography variant ="h4">
                Create Room
            </Typography>
            
            <div style={{display:"flex", justifyContent:"center"}}>
                <CreateRoomForm data = {data}/>
                
            </div>
            <FloatingAction icon = {Done} text="Create" onClick={handleSubmit}/>
            
        </div>
    )
}

export default withRouter(CreateRoomScreen);