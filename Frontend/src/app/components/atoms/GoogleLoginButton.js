import React from 'react'
import {ButtonBase,Typography} from '@material-ui/core'

import GoogleLogo from '../../res/icons/google.png'


function GoogleLoginButton(props){
    const onClick = props.onClick;

    return(
        <div>
            <ButtonBase onClick={onClick} >
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", margin:20, }}>
                    <img src = {GoogleLogo} style={{height:20, width:20}}/>
                    <Typography style={{marginLeft:10}}>
                        SignIn with Google
                    </Typography>
                </div>
            </ButtonBase>
        </div>

    )
}

export default GoogleLoginButton;