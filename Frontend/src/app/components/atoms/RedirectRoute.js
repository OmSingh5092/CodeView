import React from 'react'

import {Redirect} from 'react-router-dom'
import {UserData,CandidateData} from '../../utils/localStorage'

function RedirectRoute(props){

    if(UserData.userExists()){
        return(
            <Redirect to="/interviewer"/>
        )
    }else if(UserData.tokenExists()){
        return(
            <Redirect to="/redirect"/>
        )
    }else if(CandidateData.roomExists()){
        return(
            <Redirect to="/joinRoom"/>
        )
    }else{
        return(
            <Redirect to="/"/>
        )
    }
}

export default RedirectRoute;