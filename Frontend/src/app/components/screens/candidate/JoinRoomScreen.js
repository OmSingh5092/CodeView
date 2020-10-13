import React from 'react'
import {withRouter} from 'react-router-dom'

import {Fab,Button, Dialog,DialogTitle, DialogContent, CircularProgress,DialogActions} from '@material-ui/core'
import {FileCopy} from '@material-ui/icons'

import {CandidateData} from '../../../utils/localStorage'

import CandidateDetailsForm from '../../molecules/CandidateDetailsForm'

import AuthRedirect from '../../atoms/RedirectRoute'

function WaitingDialog(props){
    const {visibility} =props;

    

    return(
        <div>
            <Dialog open={visibility}>
                <DialogTitle>Waiting for the interviewer to let you in</DialogTitle>
                <DialogContent>
                    <CircularProgress
                        variant="indeterminate"
                        size={100}
                        style={{margin:"auto"}}/>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{}}>
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

function JoinRoomScreen(props){
    const {roomId} = props;
    const [showWaitingDialog,setWaitingDialog] = React.useState(false);
    

    const handleJoinRoom = ()=>{
        //setWaitingDialog(true);
        props.history.push("../candidate/room/"+CandidateData.getRoomId());
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

            <WaitingDialog visibility={showWaitingDialog}/>
            
        </div>
    )
}

export default withRouter(JoinRoomScreen);