import React from 'react'

import {Button} from '@material-ui/core'
import './style.css';

function LoginScreen(props){

    return(<div className="body">

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
            }}>
                Sign in as interviewer
            </Button>
            <Button color="secondary" variant="contained" style={{
                margin:20
            }}>
                Join interview room
            </Button>
        </div>
        
    </div>)
}

export default LoginScreen;