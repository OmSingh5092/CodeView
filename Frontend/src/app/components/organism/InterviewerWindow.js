import React, { useEffect } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Snackbar, TextField,DialogTitle, IconButton, Typography, Card, Box } from '@material-ui/core'

import {getRoom} from '../../utils/api/controllers/roomCtrl'
import {getProfileById} from '../../utils/api/controllers/interviewerCtrl'
import { socket } from '../../utils/websocket';
import {UserData} from '../../utils/localStorage';
import { Close } from '@material-ui/icons';

function InterviewViewHolder(props){
    const {roomId,interviewerId}  = props;
    const [interviewer,setInterviewer] = React.useState({});

    useEffect(()=>{
        getProfileById(interviewerId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                console.log("Interviewer",res);
                setInterviewer(res.interviewer);
            }
        })
    },[1])

    return(
        <Box borderColor="primary">
            <Card style={{margin:10}} variant="outlined">
                <Typography style={{margin:10}}>
                    {interviewer.name}
                </Typography>

                <Typography style={{margin:10}}>
                    {interviewer.email}
                </Typography>
                 
            </Card>
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
            <Dialog open = {open}>
                <DialogTitle>Enter the emailId of interviewer</DialogTitle>
                <DialogContent>
                    <TextField label="Email Id" onChange={(event)=>{setEmail(event.target.value)}}/>
                    {waiting?<div>Waiting <br/><CircularProgress/></div>:<div/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequest}>
                        Request
                    </Button>
                    <Button onClick ={()=>{onClose()}}>
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>

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
        
        <div style={{display:"flex",flexDirection:"column",flexGrow:1, padding:10,margin:5,borderStyle:"solid" ,borderRadius:10}}>
            <div style={{display:"flex"}}>

                <Typography style={{display:"flex", flexGrow:1}} variant="h4">
                    Interviewer Window
                </Typography>
                
            
                <IconButton onClick={()=>{onClose()}}>
                    <Close/>
                </IconButton>
            </div>
            <div>
                {isCandidate?<div/>: <Button color="primary" variant="contained" onClick = {handleRequestDialog}>
                    Add Interviewer
                </Button>}
                

                <div style={{display:"flex"}}>
                    {interviewers.map((item,index)=>(
                        <div>
                            <InterviewViewHolder roomId = {roomId} interviewerId={item}/>
                        </div>
                    ))}
                </div>

                <RequestDialog roomId = {roomId} open={requestDialogOpen} onClose={()=>{setRequestDialogOpen(false)}} onAccept = {(interviewer)=>{setIntervieweres([...interviewers,interviewer])}}/>
            </div>
        </div>
    )
}

export default InterviewerWindow;