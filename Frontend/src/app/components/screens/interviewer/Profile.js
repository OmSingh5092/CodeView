import { Typography } from '@material-ui/core'
import React from 'react'
import {withRouter} from 'react-router-dom'

import {Snackbar} from '@material-ui/core'

import {updateProfile,getProfile} from '../../../utils/api/controllers/interviewerCtrl'
import {UserData} from '../../../utils/localStorage'

import RegistrationForm from '../../molecules/RegistrationForm'

function Profile(props){
    const {data,history} = props;

    const [showSnackBar,setShowSnackBar] = React.useState(false);

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

                
                setShowSnackBar(true);

            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }

    return(
        <div style={{margin:20}}>
            <Typography variant ="h4">
                Profile
            </Typography>
            <div style={{display:"flex",flexDirection:"column" ,flexWrap:"wrap", margin:"auto", alignContent:"center", marginTop:40}}>
                <RegistrationForm data = {data} onSubmit={handleSubmit}/>
            </div>

            <Snackbar open={showSnackBar} message="Profile updated Successfully!" onClose={()=>{setShowSnackBar(false)}}/>
            
        </div>
    )
}

export default withRouter(Profile);