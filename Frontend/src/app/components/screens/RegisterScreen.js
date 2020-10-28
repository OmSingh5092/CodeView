import React from 'react'
import './style.css'

import RegistrationForm from '../../components/molecules/RegistrationForm'

import {withRouter} from 'react-router-dom'

import {updateProfile,getProfile, getProfileById} from '../../utils/api/controllers/interviewerCtrl'
import {UserData} from '../../utils/localStorage'

import AuthRedirect from '../atoms/RedirectRoute'

function RegisterScreen(props){

    const handleSubmit = (data)=>{
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
                <RegistrationForm onSubmit={handleSubmit}/>
            </div>
            
        </div>
    )
}

export default withRouter(RegisterScreen);