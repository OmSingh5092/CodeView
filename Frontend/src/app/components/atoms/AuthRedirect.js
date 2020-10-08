import React from 'react'

import {Redirect} from 'react-router-dom'
import {UserData} from '../../utils/localStorage'

function AuthRedirect(props){

    if(UserData.userExists()){
        return(
            <Redirect to="/interviewer"/>
        )
    }else if(UserData.tokenExists()){
        return(
            <Redirect to="/redirect"/>
        )
    }else{
        return(
            <Redirect to="/"/>
        )
    }

}

export default AuthRedirect;