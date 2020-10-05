import React from 'react'
import {ButtonBase,Typography} from '@material-ui/core'

import GoogleLogo from '../../res/icons/google.png'
import {GoogleLogin} from 'react-google-login'

import {googleConfig} from '../../config'


function GoogleLoginButton(props){
    const onSuccess = props.onSuccess;
    const onFailure = props.onFailure;

    return(
        <div>
            <GoogleLogin
                render={(renderProps)=>(
                    <ButtonBase onClick={renderProps.onClick}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", margin:20, }}>
                            <img src = {GoogleLogo} style={{height:20, width:20}}/>
                            <Typography style={{marginLeft:10}}>
                                SignIn with Google
                            </Typography>
                        </div>
                    </ButtonBase>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                clientId={googleConfig.clientId}
                cookiePolicy={'single_host_origin'}
            />
            
        </div>

    )
}

export default GoogleLoginButton;