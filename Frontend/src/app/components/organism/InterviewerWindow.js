import React, { useEffect } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Snackbar, TextField,DialogTitle } from '@material-ui/core'

import {getRoom} from '../../utils/api/controllers/roomCtrl'
import {getProfileById} from '../../utils/api/controllers/interviewerCtrl'
import { socket } from '../../utils/websocket';
import {UserData} from '../../utils/localStorage';

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
        <div>
            <div>
                {interviewer.name}
            </div>
        </div>
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
        <div style={{display:"flex",flexDirection:"column"}}>
            <div>
                {isCandidate?<div/>: <Button onClick = {handleRequestDialog}>
                    Add Interviewer
                </Button>}
                

                <div>
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