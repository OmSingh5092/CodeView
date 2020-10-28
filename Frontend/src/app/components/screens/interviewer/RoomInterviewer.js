import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'
import ChatWindow from '../../organism/ChatWindow'
import InterviewerWindow from '../../organism/InterviewerWindow'

import {checkInterviewer} from '../../../utils/api/controllers/roomCtrl'
import {socket} from '../../../utils/websocket'
import { Button, Dialog, DialogActions, DialogTitle, IconButton} from '@material-ui/core'
import {getCandidateProfile} from '../../../utils/api/controllers/candidateCtrl'

import {Chat, People} from '@material-ui/icons'

//CSS Styles
import '../style.css'

function Candidate(props){

    return(
        <div>
            
        </div>
    )
}

function ActionBar(props){
    const {onButtonClick}  = props;
    
    return(
        <div style={{display:"flex"}}>
            <IconButton onClick={()=>{onButtonClick(0)}}>
                <Chat/>
            </IconButton>
            <IconButton onClick = {()=>onButtonClick(1)}>
                <People/>
            </IconButton>
        </div>
    )
}

function InterviewScreen(props){
    const {roomId} = props;

    const [chatWindow,setChatWindow] = React.useState(false);
    const [peopleWindow,setPeopleWindow] = React.useState(false);


    return(
        <div style={{display:"flex",flexGrow:1,flexDirection:"column"}}>
            <div style={{display:"flex"}}>
                Interviewer Room

                <div>
                    <ActionBar onButtonClick={
                        (pos)=>{
                            if(pos == 0){
                                setChatWindow(true);
                            }else if(pos == 1){
                                setPeopleWindow(true);
                            }
                        }
                    }/>
                </div>
            </div>

            <div style={{display:"flex"}}>
                <div style={{display:"flex", flexGrow:1,flexDirection:"column"}}>
                    
                    <CodeEditor roomId = {roomId}/>

                    <div style={{display:"flex"}}>
                        <InterviewerWindow roomId = {roomId} isCandidate = {false} onClose = {()=>{setPeopleWindow(false)}}/>
                    </div>

                    
                </div>
                <div style={{display:"flex"}}>
                    <ChatWindow roomId = {roomId} isCandidate = {false} onClose={()=>{setChatWindow(false)}}/>
                </div>
            </div>

            
            
        </div>
    )
}

function JoinCandidateDialog(props){
    const {onDecline,onAccept,candidate,open} = props;
    const [candidateInfo,setCandidateInfo] = React.useState({});

    useEffect(()=>{
        getCandidateProfile(candidate).then((res)=>(res.json()))
        .then((res)=>{
            if(res.sucess){
                setCandidateInfo(res.candidate);
            }
        })
    },[1])
    

    return (
        <div>
            <Dialog open={open}>
            <DialogTitle>A candidate is requesting to join room (Candidate id = {candidate})</DialogTitle>
                <DialogActions>
                    <Button onClick={onAccept}>
                        Accept
                    </Button>

                    <Button onClick={onDecline}>
                        Decline
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function RoomInterviewer(props){

    const {id} = useParams();
    const [checkStatus, setCheckStatus] = React.useState(false);
    const [requestedCandidate,setRequestedCandidate] = React.useState("");
    const [showJoinDialog,setShowJoinDialog] = React.useState(false);


    const handleCandidateAccept = ()=>{
        socket.emit("accept",({room:id, candidate:requestedCandidate, res:true}));
        setShowJoinDialog(false);
    }

    const handleCandidateDecline = ()=>{
        socket.emit("accept",({room:id, candidate:requestedCandidate, res:false}));
        setShowJoinDialog(false);
    }




    useEffect(()=>{
        checkInterviewer(id).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Response",res);
            if(res.success){
                if(res.exists){
                    setCheckStatus(true);
                }else{
                    props.history.push('../../');
                }
            }else{
                props.history.push('../../');
            }
        })

        socket.on("wait/"+id,(data)=>{
            const {room ,candidate,waiting} = data;
            console.log("Received Request",data);
            if(waiting){
                setShowJoinDialog(true);
            }else{
                setShowJoinDialog(false);
            }
            
            setRequestedCandidate(candidate);
        })
    },[])

    return(
        <div className="root">
            {checkStatus?<InterviewScreen roomId = {id}/>:<LoadScreen title="Checking the interviewer"/>}
            
            <JoinCandidateDialog open = {showJoinDialog} onAccept={handleCandidateAccept} onDecline = {handleCandidateDecline} candidate = {requestedCandidate}/>
        </div>
    )
}

export default withRouter(RoomInterviewer);