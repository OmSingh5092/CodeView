import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'
import {FileCopy} from '@material-ui/icons'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'
import ChatWindow from '../../organism/ChatWindow'
import InterviewerWindow from '../../organism/InterviewerWindow'

import Online from '../../../res/icons/live.png';
import Offline from '../../../res/icons/offline.png'

import {checkInterviewer,removeInterviewer} from '../../../utils/api/controllers/roomCtrl'
import {socket} from '../../../utils/websocket'
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Typography, Card, Menu} from '@material-ui/core'
import {getCandidateProfile} from '../../../utils/api/controllers/candidateCtrl'
import {UserData} from '../../../utils/localStorage'

import {Chat, ExitToApp, People, Person} from '@material-ui/icons'

//CSS Styles
import '../style.css'

function CandidateBar(props){
    const {isJoined} = props;

    return(
        <div>
            {isJoined?
            <div style={{display:"flex"}}>
                <img src ={Online} style={{height:20,width:20}}/>
                <Typography>
                    Candidate is Live..
                </Typography>

            </div>
            :
            <div style={{display:"flex"}}>
                <img src ={Offline} style={{height:20,width:20}}/>
                <Typography>
                    Candidate is not live
                </Typography>
            </div>}
        </div>
    )
}

function ActionBar(props){
    const {onButtonClick,candidateId,joined}  = props;
    const [anchor,setAnchor] = React.useState(null);
    const [candidateDetails,setDetails] = React.useState([]);

    const loadDetails = ()=>{
        getCandidateProfile(candidateId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                var details = [];

                for(const [key,value] of Object.entries(res.candidate.details)){
                    details.push([key,value]);
                }
                setDetails(details);
            }
        })
    }
    
    return(
        <Card> 
            {joined?
                <IconButton onClick = {(event)=>{setAnchor(event.currentTarget); loadDetails()}}>
                    <Person/>
                </IconButton>
                :
                <div/>
            }
            
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

            <Menu open ={Boolean(anchor)} anchorEl={anchor} onClose={()=>{setAnchor(null)}}>
                <div style={{margin:20}}>
                    {candidateDetails.map((item,index)=>(
                        <div>
                            {item[0]}  =  {item[1]}
                        </div>
                    ))}
                </div>
            </Menu>
        </Card>
    )
}

const InterviewScreen = withRouter(function(props){
    const {roomId,candidateJoined,history,candidateId} = props;

    const [chatWindow,setChatWindow] = React.useState(false);
    const [peopleWindow,setPeopleWindow] = React.useState(false);
    
    const handleLeaveRoom = ()=>{
        removeInterviewer(roomId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                history.push('../../');
            }
        })

        socket.emit("interviewer_status",({room:roomId,joined:false,interviewer:UserData.getProfileData()._id}))
    }


    return(
        <div style={{display:"flex",flexGrow:1,flexDirection:"column"}} className="root">
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex",flexGrow:1, flexWrap:"wrap"}}>
                    <Typography variant="h4">
                        Interviewer Room
                    </Typography>

                    <div style={{display:"flex", justifyContent:"center",flexGrow:1}}>
                        <div style={{fontSize:20, textAlign:"center" }}>
                            Room Id -  
                        </div>
                        <div style={{fontSize:20, textAlign:"center" }}>
                            {roomId}
                        </div>

                        <Button onClick={()=>{
                            navigator.clipboard.writeText(roomId);}}>
                            <FileCopy/>
                        </Button>
                    </div>
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
                                socket.emit("interviewer_status",({room:roomId,joined:false,interviewer:UserData.getProfileData()._id}))
                                history.push('../../');
                            }else if(pos == 3){
                                handleLeaveRoom();
                            }
                        }
                    }
                    joined = {candidateJoined}
                    candidateId= {candidateId}/>
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

        socket.on("candidate_status/"+id,(data)=>{
            if(data.joined){
                setCandidateJoined(true);
            }else{
                setCandidateJoined(false);
            }
        })

        //Pinging server
        const interval = setInterval(()=>{socket.emit("interviewer_status",({room:id,joined:true,interviewer:UserData.getProfileData()._id}))},1000);
        
        //Adding event if the tab gets closed
        window.addEventListener("beforeunload", (ev) => {
            socket.emit("interviewer_status",({room:id,joined:false,interviewer:UserData.getProfileData()._id}))
            clearInterval(interval);
        });

        return ()=>{
            socket.emit("interviewer_status",({room:id,joined:false,interviewer:UserData.getProfileData()._id}))
            clearInterval(interval);
        }
    },[])

    return(
        <div className="root" >
            {checkStatus?<InterviewScreen candidateJoined = {candidateJoined} candidateId = {requestedCandidate} roomId = {id}/>:<LoadScreen title="Checking the interviewer"/>}
            
            <JoinCandidateDialog open = {showJoinDialog} onAccept={handleCandidateAccept} onDecline = {handleCandidateDecline} candidate = {requestedCandidate}/>
        </div>
    )
}

export default withRouter(RoomInterviewer);