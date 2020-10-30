import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'
import ChatWindow from '../../organism/ChatWindow'
import InterviewerWindow from '../../organism/InterviewerWindow'

import {checkInterviewer,removeInterviewer} from '../../../utils/api/controllers/roomCtrl'
import {socket} from '../../../utils/websocket'
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Typography, Card} from '@material-ui/core'
import {getCandidateProfile} from '../../../utils/api/controllers/candidateCtrl'

import {Chat, ExitToApp, People,FileCopy} from '@material-ui/icons'

import {CandidateData} from '../../../utils/localStorage'


function ActionBar(props){
    const {onButtonClick}  = props;
    
    return(
        <Card>
            <IconButton onClick={()=>{onButtonClick(0)}}>
                <Chat/>
            </IconButton>
            <IconButton onClick = {()=>onButtonClick(1)}>
                <People/>
            </IconButton>
            <IconButton onClick = {()=>onButtonClick(2)}>
                <ExitToApp/>
            </IconButton>
            <Button onClick = {()=>onButtonClick(3)}>
                Leave Room
            </Button>
        </Card>
    )
}


function RoomCandidate(props){
    const {id} = useParams();
    const roomId = id;

    const {history} = props;

    const [chatWindow,setChatWindow] = React.useState(false);
    const [peopleWindow,setPeopleWindow] = React.useState(false);
    
    const handleLeaveRoom = ()=>{
        CandidateData.clearCandidate();
        props.history.push('../../');

        socket.emit("candidate_status",{room:id,joined:false})
    }

    useEffect(()=>{
        socket.on("interviewer_disconnect/"+roomId,(data)=>{
            history.push("../../");
        })

        //Pinging server
        const interval = setInterval(()=>{socket.emit("candidate_status",{room:id,joined:true})},1000);
        

        //Adding event if the tab gets closed
        window.addEventListener("beforeunload", (ev) => {
            socket.emit("candidate_status",{room:id,joined:false})
            clearInterval(interval);
        });

        return ()=>{
            clearInterval(interval)
            socket.emit("candidate_status",{room:id,joined:false})
        }
    })


    return(
        <div style={{display:"flex",flexGrow:1,flexDirection:"column"}} className="root">
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:"flex",flexGrow:1, flexWrap:"wrap"}}>
                    <Typography variant="h4">
                        Candidate Room
                    </Typography>

                    <div style={{display:"flex", justifyContent:"center",flexGrow:1}}>
                        <div style={{fontSize:20, textAlign:"center" }}>
                            Copy Room Id 
                        </div>

                        <Button onClick={()=>{
                            navigator.clipboard.writeText(roomId);}}>
                            <FileCopy/>
                        </Button>
                    </div>
                </div>

                <div style={{margin:10,}}>
                    <ActionBar onButtonClick={
                        (pos)=>{
                            if(pos == 0){
                                setChatWindow(true);
                            }else if(pos == 1){
                                setPeopleWindow(true);
                            }else if(pos == 2){
                                socket.emit("candidate_status",{room:id,joined:false})
                                history.push('../../');
                            }else if(pos == 3){
                                handleLeaveRoom();
                            }
                        }
                    }/>
                </div>
            </div>

            <div style={{display:"flex",flexGrow:1}}>
                <div style={{display:"flex", flexGrow:1,flexDirection:"column"}}>
                    
                    <div style={{display:"flex",flexGrow:1,margin:20}}>
                        <CodeEditor roomId = {roomId}/>

                    </div>
                    
                    {peopleWindow?
                    <div style={{display:"flex", padding:5,margin:5}}>
                        <InterviewerWindow roomId = {roomId} isCandidate = {true} onClose = {()=>{setPeopleWindow(false)}}/>
                    </div>
                    :<div/>}
                    
                    
                </div>
                <div style={{display:"flex"}}>
                    {chatWindow?
                        <ChatWindow roomId = {roomId} isCandidate = {true} onClose={()=>{setChatWindow(false)}}/>:
                        <div/>
                    }
                    
                </div>
            </div>

            
            
        </div>
    )
}

export default withRouter(RoomCandidate);