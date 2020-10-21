import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'

import {checkInterviewer} from '../../../utils/api/controllers/roomCtrl'
import {socket} from '../../../utils/websocket'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import {getCandidateProfile} from '../../../utils/api/controllers/candidateCtrl'

function InterviewScreen(props){
    const {roomId} = props;
    return(
        <div>
            Interviewer room
            <CodeEditor roomId = {roomId}/>
        </div>
    )
}

function JoinCandidateDialog(props){
    const {onDecline,onAccept,candidate,open} = props;

    

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>A candidate is requesting to join room</DialogTitle>
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
    const [requestedCandidate,setRequestedCandidate] = React.useState({});
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
        <div>
            {checkStatus?<InterviewScreen roomId = {id}/>:<LoadScreen title="Checking the interviewer"/>}
            
            <JoinCandidateDialog open = {showJoinDialog} onAccept={handleCandidateAccept} onDecline = {handleCandidateDecline} candidate = {requestedCandidate}/>
        </div>
    )
}

export default withRouter(RoomInterviewer);