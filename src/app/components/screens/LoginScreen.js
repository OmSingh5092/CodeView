import React from 'react'

import {Button,Dialog, DialogContent, DialogTitle,DialogActions, ButtonBase} from '@material-ui/core'
import './style.css';
import {withRouter} from 'react-router-dom'

import IntervierLogin from '../molecules/InterViewerLogin';
import JoinRoomForm from '../molecules/JoinRoomForm';
import GoogleLoginButton from '../atoms/GoogleLoginButton';

import AuthRedirect from '../atoms/RedirectRoute';

import {googleSignIn} from '../../utils/api/controllers/signInCtrl'
import {getProfile} from '../../utils/api/controllers/interviewerCtrl'
import {checkRoom} from '../../utils/api/controllers/roomCtrl'

import {UserData} from '../../utils/localStorage';

const InterviewerDialog = withRouter((props)=>{
    const isOpen = props.isOpen;
    const onClose = props.onClose;

    const googleLoginSuccess = (response)=>{
        var profile = response.profileObj
        console.log("Login");
        googleSignIn(response).then((res)=>(res.json()))
        .then((data)=>{
            console.log("login successfull");
            //Saving data in 
            //Getting Success.
            if(data.success){
                UserData.setToken(data.jwt);
                //setting email
                UserData.setEmail(profile.email);
                if(data.newUser){
                    props.history.push('/register');
                }else{
                    console.log(UserData.getToken());
                    getProfile().then((res)=>(res.json()))
                    .then((res)=>{
                        if(res.success){
                            UserData.setProfileData(res.profile);
                            props.history.push('/interviewer');
                        }else{
                            console.log(res.msg);
                        }
                        
                    })
                }
            }else{
                console.log(data.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }
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
                <GoogleLoginButton onSuccess= {googleLoginSuccess} onFailure = {(response)=>{console.log("Error",response)}}/>
            </div>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancle
                </Button>
            </DialogActions>
        </Dialog>
        
    )
});

const CandidateDialog = withRouter((props)=>{
    const isOpen = props.isOpen;
    const onClose = props.onClose;
    return(
        <Dialog open={isOpen} onClose={onClose} style={{margin:20}}>
            <DialogTitle>Please enter the details</DialogTitle>
            <DialogContent style={{margin:20}}>
                    <div>
                        <JoinRoomForm/>
                    </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancle
                </Button>
            </DialogActions>
        </Dialog>
        )
})

function LoginScreen(props){
    const [interviewerDialog,setInterviewDialog] = React.useState(false);
    const [candidateDialog,setCandidateDialog] = React.useState(false);

    return(
    <div className="body">
        <AuthRedirect/>
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

export default withRouter(LoginScreen);