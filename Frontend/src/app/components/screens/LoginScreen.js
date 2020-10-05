import React from 'react'

import {Button,Dialog, DialogContent, DialogTitle,DialogActions, ButtonBase} from '@material-ui/core'
import './style.css';

import IntervierLogin from '../molecules/InterViewerLogin';
import JoinRoomForm from '../molecules/JoinRoomForm';
import GoogleLoginButton from '../atoms/GoogleLoginButton';

function InterviewerDialog(props){
    const isOpen = props.isOpen;
    const onClose = props.onClose;
    return(
        <Dialog open={isOpen} onClose = {onClose}>
            <DialogTitle>Sign In As An Interviewer</DialogTitle>
            <DialogContent style={{margin:20}}>
                <div>
                    <IntervierLogin onSubmit ={(data)=>{

                    }} />
                </div>
            </DialogContent>
            <div style={{margin:"auto"}}>
                <GoogleLoginButton onClick = {()=>{}}/>
            </div>
            <div style={{margin:"auto"}} >
                <ButtonBase onClick={()=>{}} >
                    <div style={{margin:20, fontFamily:"Roboto-Black", fontSize:20}}>
                        Are you a new user?
                    </div>
                </ButtonBase>
            </div>
            
            
            
            <DialogActions>
                <Button onClick={onClose}>
                    Cancle
                </Button>
            </DialogActions>
        </Dialog>
        
    )
}

function CandidateDialog(props){
    const isOpen = props.isOpen;
    const onClose = props.onClose;
    return(
        <Dialog open={isOpen} onClose={onClose} style={{margin:20}}>
            <DialogTitle>Please enter the details</DialogTitle>
            <DialogContent style={{margin:20}}>
                    <div>
                        <JoinRoomForm onSubmit = {(data)=>{}}/>
                    </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancle
                </Button>
            </DialogActions>
        </Dialog>
        )
}

function LoginScreen(props){
    const [interviewerDialog,setInterviewDialog] = React.useState(false);
    const [candidateDialog,setCandidateDialog] = React.useState(false);

    return(
    <div className="body">

        <div style={{
            fontSize:50,
            fontFamily:"Roboto-Black",
            textAlign:"center"
        }}>
            Welcome! to CodeView
        </div><br/>

        <div style={{
            textAlign:"center"
        }}>
            Best online solution for taking coding interviews.
        </div>

        <div style={{
            flexGrow:1,
            flexDirection:"row",
            alignContent:"center",
            margin:"auto",
            marginTop:40
        }}>
            <Button color="primary" variant="contained" style={{
                margin:20
            }} onClick={()=>setInterviewDialog(true)}>
                Sign in as interviewer
            </Button>
            <Button color="secondary" variant="contained" style={{
                margin:20
            }} onClick={()=> setCandidateDialog(true)}>
                Join interview room
            </Button>
        </div>
        
        <InterviewerDialog isOpen = {interviewerDialog} onClose = {()=> setInterviewDialog(false)}/>
        <CandidateDialog isOpen = {candidateDialog} onClose = {()=> setCandidateDialog(false)}/>
        
    </div>)
}

export default LoginScreen;