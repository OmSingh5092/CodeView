import React from 'react'
import {withRouter} from 'react-router-dom'

import {Fab,Button} from '@material-ui/core'
import {FileCopy} from '@material-ui/icons'

import {CandidateData} from '../../../utils/localStorage'

import CandidateDetailsForm from '../../molecules/CandidateDetailsForm'

import AuthRedirect from '../../atoms/RedirectRoute'

function JoinRoomScreen(props){
    const {roomId} = props;

    const handleJoinRoom = ()=>{

    }

    const handleLeaveRoom = ()=>{
        CandidateData.clearCandidate();
        props.history.push('../');
    }

    return(
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <AuthRedirect/>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{fontSize:50, textAlign:"center" }}>
                    Interview Title
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div style={{fontSize:20, textAlign:"center" }}>
                        Room Id -  
                    </div>
                    <div style={{fontSize:20, textAlign:"center" }}>
                        51534J1k5f
                    </div>

                    <Button onClick={()=>{
                        navigator.clipboard.writeText("Om Singh");

                        }}>
                        <FileCopy/>
                    </Button>
                </div>
                
            </div>
            <div style={{display:"flex",flexDirection:"column", alignContent:"center"}}>
                <CandidateDetailsForm fields ={[{name:"Name",type:"text"},{name:"Phone",type:"number"}]}/>
            </div>

            <Fab variant="extended" color="secondary"  style={{position:"absolute", bottom:30, right:30}}
            onClick={handleJoinRoom}
            >
                Join Room
            </Fab>
            <Fab variant="extended"  style={{position:"absolute", bottom:30, left:30}}
            onClick={handleLeaveRoom}
            >
                Leave Room
            </Fab>
            
        </div>
    )
}

export default withRouter(JoinRoomScreen);