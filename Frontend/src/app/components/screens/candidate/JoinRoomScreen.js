import React from 'react'
import {withRouter} from 'react-router-dom'

import {Fab,Button, Dialog,DialogTitle, DialogContent, CircularProgress,DialogActions} from '@material-ui/core'
import {FileCopy} from '@material-ui/icons'

import {CandidateData} from '../../../utils/localStorage'

import CandidateDetailsForm from '../../molecules/CandidateDetailsForm'

import AuthRedirect from '../../atoms/RedirectRoute'

import {socket} from '../../../utils/websocket'

function WaitingDialog(props){
    const {open,onCancle} =props;

    return(
        <div>
            <Dialog open={open}>
                <DialogTitle>Waiting for the interviewer to let you in</DialogTitle>
                <DialogContent>
                    <CircularProgress
                        variant="indeterminate"
                        size={100}
                        style={{margin:"auto"}}/>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancle}>
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

function JoinRoomScreen(props){
    const roomId = CandidateData.getRoomId();
    const [showWaitingDialog,setWaitingDialog] = React.useState(false);
    

    const handleJoinRoom = ()=>{
        setWaitingDialog(true);
        console.log("Room",roomId);
        socket.emit("request",{room:roomId, candidate:CandidateData.getCandidateId(), waiting:true});

        socket.on("waitResponse/"+roomId,(data)=>{
            console.log("Response",data);
            setWaitingDialog(false);
            props.history.push("../candidate/room/"+CandidateData.getRoomId());
        })
    }

    const handleCancleJoinRoom = ()=>{
        setWaitingDialog(false);

        socket.emit("request",{room:roomId, candidate:CandidateData.getCandidateId(),waiting:false});
    }

    const handleLeaveRoom = ()=>{
        CandidateData.clearCandidate();
        props.history.push('../');
    }

    return(
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <AuthRedirect/>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{fontSize:50, textAlign:"center" }}>
                    Interview Title
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div style={{fontSize:20, textAlign:"center" }}>
                        Room Id -  
                    </div>
                    <div style={{fontSize:20, textAlign:"center" }}>
                        {CandidateData.getRoomId()}
                    </div>

                    <Button onClick={()=>{
                        navigator.clipboard.writeText(CandidateData.getRoomId());}}>
                        <FileCopy/>
                    </Button>
                </div>
                
            </div>
            <div style={{display:"flex",flexDirection:"column", alignContent:"center"}}>
                <CandidateDetailsForm/>
            </div>

            <Fab variant="extended" color="secondary"  style={{position:"absolute", bottom:30, right:30}}
            onClick={handleJoinRoom}
            >
                Join Room
            </Fab>
            <Fab variant="extended"  style={{position:"absolute", bottom:30, left:30}}
            onClick={handleLeaveRoom}
            >
                Leave Room
            </Fab>

            <WaitingDialog open={showWaitingDialog} onCancle = {handleCancleJoinRoom}/>
            
        </div>
    )
}

export default withRouter(JoinRoomScreen);