import React from 'react'
import './style.css'

import RegistrationForm from '../../components/molecules/RegistrationForm'

import {withRouter} from 'react-router-dom'

import {updateProfile,getProfile, getProfileById} from '../../utils/api/controllers/interviewerCtrl'
import {UserData} from '../../utils/localStorage'

import AuthRedirect from '../atoms/RedirectRoute'
import { Snackbar } from '@material-ui/core'

function RegisterScreen(props){

    const [showSnackBar, setShowSnackBar] = React.useState(false);
    const [message,setMessage] = React.useState("");

    var data = {
        name:"",
        phone:"",
        company:"",
        website:"",
        photo:"",
    }

    const validateData = ()=>{
        if(data.name == ""){
            setMessage("Please enter a name!");
            return false;
        }else if(data.phone ==""){
            setMessage("Please enter a phone number!")
            return false;
        }else if(data.company == ""){
            setMessage("Please enter a company!");
            return false;
        }else if(data.website == ""){
            setMessage("Please enter a website!");
            return false;
        }

        return true;
    }

    const handleSubmit = ()=>{
        if(!validateData()){
            setShowSnackBar(true);
            return false;
        }

        //updating the profile
        console.log("Token",UserData.getToken());
        updateProfile(data).then((res)=>(res.json()))
        .then((res)=>{
            return getProfile().then((res)=>(res.json()))
        }).then((res)=>{
            if(res.success){
                console.log("Response",res);
                UserData.setProfileData(res.profile);
                UserData.userExists(true);
                props.history.push('/interviewer');
            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }

    return(
        <div className="root" style={{flexWrap:"wrap"}}>
            <AuthRedirect/>
            <div style={{fontFamily:"Roboto-Black", fontSize:50, textAlign:"center"}}>
                Please enter the details.
            </div>
            <div style={{display:"flex",flexDirection:"column" ,flexWrap:"wrap", margin:"auto", alignContent:"center", marginTop:40}}>
                <RegistrationForm data = {data} onSubmit={handleSubmit}/>
            </div>

            <Snackbar open = {showSnackBar} message={message} onClose = {()=>{setShowSnackBar(false)}}/>
            
        </div>
    )
}

export default withRouter(RegisterScreen);