import React, { useEffect } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Snackbar, TextField,DialogTitle, IconButton, Typography, Card, Box } from '@material-ui/core'

import {getRoom} from '../../utils/api/controllers/roomCtrl'
import {getProfileById} from '../../utils/api/controllers/interviewerCtrl'
import { socket } from '../../utils/websocket';
import {UserData,CandidateData} from '../../utils/localStorage';
import { Close } from '@material-ui/icons';

import Online from '../../res/icons/live.png'
import Offline from '../../res/icons/offline.png'

function InterviewViewHolder(props){
    const {roomId,interviewerId,isLive}  = props;
    const [interviewer,setInterviewer] = React.useState({});
    const [live,setLive] = React.useState(false);

    var isSelf = false;
    if(CandidateData.candidateExists()){
        isSelf = false;
    }else if(interviewerId == UserData.getProfileData()._id){
        isSelf = true;
    }

    useEffect(()=>{
        getProfileById(interviewerId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                console.log("Interviewer",res);
                setInterviewer(res.interviewer);
            }
        })

        socket.on("interviewer_status/"+roomId,(data)=>{
            if(data.interviewer == interviewerId){
                if(data.joined){
                    setLive(true);
                }else{
                    setLive(false);
                }
                
            }
        })
    },[1])

    return(
        <Box borderColor="primary">
            {!isSelf?
                <Card style={{margin:10}} variant="outlined">
                {live?
                <div>
                    <img src = {Online} style={{height:20,width:20}}/> Online
                </div>
                :
                <div>
                    <img src = {Offline} style={{height:20,width:20}}/> Offline
                </div>}
                <Typography style={{margin:10}}>
                    {interviewer.name}
                </Typography>

                <Typography style={{margin:10}}>
                    {interviewer.email}
                </Typography>
                 
                </Card>

                :
                <div/>
            }
            
        </Box>
    )

}

function RequestDialog(props){ 
    const {roomId,open,onClose,onAccept} = props;
    const [email,setEmail] = React.useState("");
    const [waiting,setWaiting] = React.useState(false);
    const [showSnackBar,setShowSnackBar] = React.useState(false);
    const [snackBarMessage,setSnackBarMessage] = React.useState("");

    const handleRequest = ()=>{
        socket.emit("request_interviewer",{room:roomId,email:email});
        setWaiting(true);
        socket.on("interviewer_wait_response/"+roomId,(data)=>{
            if(data.res){
                onAccept(data.interviewer._id);
            }else{
                setSnackBarMessage(data.msg);
                setShowSnackBar(true);
            }

            onClose();
            setWaiting(false);
        })
    }


    return(
        <div>
            {open?
                <Card style={{width:500}}>
                    <div style={{display:"flex", flexDirection:"column",margin:10}}>
                        <Typography style={{fontFamily:"Roboto-Black"}}>
                            Enter the emailId of interviewer
                        </Typography>
                        <TextField style={{margin:10}}label="Email Id" onChange={(event)=>{setEmail(event.target.value)}} variant="outlined"/>

                        {waiting?<div style={{display:"flex"}}>Waiting <br/><CircularProgress style={{marginLeft:20}}/></div>:<div/>}

                        <div style={{display:"flex"}}>
                            <Button onClick={handleRequest} color="primary" variant="outlined" style={{margin:10}}>
                                Request
                            </Button>
                            <Button onClick ={()=>{onClose()}} color = "primary" variant = "outlined" style={{margin:10}}>
                                Cancle
                            </Button>
                        </div>
                    </div>
                </Card>
                
                :
                <div/>
            }

            <Snackbar open = {showSnackBar} onClose= {()=>setShowSnackBar(false)} message={snackBarMessage}/>
        </div>
    )
}

function InterviewerWindow(props){
    const {roomId,isCandidate,onClose} = props;
    var [interviewers,setIntervieweres] = React.useState([]);
    var [room,setRoom] = React.useState({});
    const [requestDialogOpen,setRequestDialogOpen] = React.useState(false);

    useEffect(()=>{
        getRoom(roomId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                setRoom(res.room);
                setIntervieweres(res.room.interviewers);

                console.log("Room",res.room);
            }else{

            }
        })
    },[1])

    const handleRequestDialog = ()=>{
        setRequestDialogOpen(true);
    }

    return(
        
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,borderStyle:"solid" ,borderRadius:10,padding:10}}>
            <div style={{display:"flex"}}>
                <div style={{display:"flex", flexGrow:1}}>
                    <Typography  variant="h4" style={{marginRight:10}}>
                        Interviewer Window
                    </Typography>
                    
                    {isCandidate?<div/>: <Button color="primary" variant="contained" onClick = {handleRequestDialog}>
                        Add Interviewer
                    </Button>}
                </div>
                
                <IconButton onClick={()=>{onClose()}}>
                    <Close/>
                </IconButton>
            </div>

            <RequestDialog roomId = {roomId} open={requestDialogOpen} onClose={()=>{setRequestDialogOpen(false)}} onAccept = {(interviewer)=>{setIntervieweres([...interviewers,interviewer])}}/>
            <div>
                <div style={{display:"flex"}}>
                    {interviewers.map((item,index)=>(
                        <div>
                            <InterviewViewHolder roomId = {roomId} interviewerId={item}/>
                        </div>
                    ))}
                </div>

                
            </div>
        </div>
    )
}

export default InterviewerWindow;