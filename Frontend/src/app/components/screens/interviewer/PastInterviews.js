import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'

import {Add} from '@material-ui/icons'
import {Card, Typography,Button} from '@material-ui/core';

import FloatingAction from '../../atoms/FloatingAction';

import {getRoomsByInterviewer} from '../../../utils/api/controllers/roomCtrl'


const ViewHolder = withRouter(function(props){
    const {room,history} = props;

    const handleEnterRoom=  ()=>{
        history.push('./room/'+room._id);
    }

    return(
        <Card>
            <div style={{display:"flex",flexDirection:"column",margin:10}}>
                <Typography style={{margin:10}}>
                    Room Id = {room._id}
                </Typography>
                <Typography style={{magrin:10}} variant="h6 ">
                    Title = {room.title}
                </Typography>

                <Button onClick={handleEnterRoom} style={{margin:10}} variant="contained" color="primary">
                    Enter Room
                </Button>
            </div>
        </Card>
    )
})

function PastInterviews(props){

    const [rooms,setRooms] = React.useState([]);

    useEffect(()=>{
        getRoomsByInterviewer().then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                setRooms(res.rooms);
            }
        })
    },[1])

    return(
    
        <div style={{margin:20}}>
            <Typography variant ="h4">
                Your Rooms
            </Typography>

            <div style={{display:"flex",margin:20}}>

                {rooms.map((item,index)=>(
                    <div style={{display:"flex",margin:10}}>
                        <ViewHolder room = {item}/>
                    </div>
                ))}

            </div>
            
            <FloatingAction icon={Add} text="Add Interview Room" onClick={()=>{props.history.push('createRoom')}}/>
        </div>
    )
}

export default withRouter(PastInterviews);