import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'
import ChatWindow from '../../organism/ChatWindow'
import InterviewerWindow from '../../organism/InterviewerWindow'

import {checkInterviewer,removeInterviewer} from '../../../utils/api/controllers/roomCtrl'
import {socket} from '../../../utils/websocket'
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Typography, Card} from '@material-ui/core'
import {getCandidateProfile} from '../../../utils/api/controllers/candidateCtrl'

import {Chat, ExitToApp, People} from '@material-ui/icons'

//CSS Styles
import '../style.css'

function CandidateBar(props){
    const {isJoined} = props;

    return(
        <div>
            {isJoined?
            <div style={{display:"flex"}}>
                <Typography>
                    Candidate is Live..
                </Typography>

            </div>
            :
            <div>
                <Typography>
                    Candidate is not live
                </Typography>
            </div>}
        </div>
    )
}

function ActionBar(props){
    const {onButtonClick}  = props;
    
    return(
        <Card>
            <IconButton onClick={()=>{onButtonClick(0)}}>
                <Chat/>
            </IconButton>
            <IconButton onClick = {()=>onButtonClick(1)}>
                <People/>
            </IconButton>
            <IconButton onClick = {()=>onButtonClick(2)}>
                <ExitToApp/>
            </IconButton>
            <Button onClick = {()=>onButtonClick(3)}>
                Leave Room
            </Button>
        </Card>
    )
}

const InterviewScreen = withRouter(function(props){
    const {roomId,candidateJoined,history} = props;

    const [chatWindow,setChatWindow] = React.useState(false);
    const [peopleWindow,setPeopleWindow] = React.useState(false);
    
    const handleLeaveRoom = ()=>{
        removeInterviewer(roomId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                history.push('../../');
            }
        })
    }


    return(
        <div style={{display:"flex",flexGrow:1,flexDirection:"column"}} className="root">
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex",flexGrow:1, flexWrap:"wrap"}}>
                    <Typography variant="h4">
                        Interviewer Room
                    </Typography>
                </div>
                
                <div style={{display:"flex",margin:10}}>
                    <CandidateBar isJoined = {candidateJoined}/>
                </div>
                

                <div style={{margin:10,}}>
                    <ActionBar onButtonClick={
                        (pos)=>{
                            if(pos == 0){
                                setChatWindow(true);
                            }else if(pos == 1){
                                setPeopleWindow(true);
                            }else if(pos == 2){
                                history.push('../../');
                            }else if(pos == 3){
                                handleLeaveRoom();
                            }
                        }
                    }/>
                </div>
            </div>

            <div style={{display:"flex",flexGrow:1}}>
                <div style={{display:"flex", flexGrow:1,flexDirection:"column"}}>
                    
                    <div style={{display:"flex",flexGrow:1,margin:10}}>
                        <CodeEditor roomId = {roomId}/>

                    </div>
                    
                    {peopleWindow?
                    <div style={{display:"flex",padding:5,margin:5}}>
                        <InterviewerWindow roomId = {roomId} isCandidate = {false} onClose = {()=>{setPeopleWindow(false)}}/>
                    </div>
                    :<div style={{display:"flex"}}/>}
                    
                    
                </div>
                <div style={{display:"flex"}}>
                    {chatWindow?
                        <ChatWindow roomId = {roomId} isCandidate = {false} onClose={()=>{setChatWindow(false)}}/>:
                        <div/>
                    }
                    
                </div>
            </div>

            
            
        </div>
    )
})

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
    const [candidateJoined, setCandidateJoined] = React.useState(false);


    const handleCandidateAccept = ()=>{
        socket.emit("accept",({room:id, candidate:requestedCandidate, res:true}));
        setShowJoinDialog(false);
        setCandidateJoined(true);
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
        <div className="root" >
            {checkStatus?<InterviewScreen candidateJoined = {candidateJoined} roomId = {id}/>:<LoadScreen title="Checking the interviewer"/>}
            
            <JoinCandidateDialog open = {showJoinDialog} onAccept={handleCandidateAccept} onDecline = {handleCandidateDecline} candidate = {requestedCandidate}/>
        </div>
    )
}

export default withRouter(RoomInterviewer);