import React, { useEffect } from 'react'
import { Button, CircularProgress, Snackbar, TextField,Input, IconButton, Typography, Card } from '@material-ui/core'
import {withRouter} from 'react-router-dom'

import {getChats} from '../../utils/api/controllers/chatCtrl'
import {uploadFile} from '../../utils/firebase/storage'

import {UserData,CandidateData} from '../../utils/localStorage'
import {socket} from '../../utils/websocket'
import { Close } from '@material-ui/icons'

import {getProfileById} from '../../utils/api/controllers/interviewerCtrl'

function Chat(props){
    const {chat} = props; 
    
    const [info,setInfo] = React.useState({});
    useEffect(()=>{
        if(chat.isCandidate){
            return;
        }

        getProfileById(chat.sender).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                setInfo(res.profile);
            }
        })

    },[1])

    return(
        <div style={{display:"flex",flexWrap:"wrap",margin:10,}}>
            <Card variant="contained" style={{backgroundColor:"#f7deff"}} >
                <div style={{display:"flex", flexDirection:"column",margin:10,}}>
                    <div style={{margin:10}}>
                        {chat.isCandidate?
                            <Typography>
                                Candidate
                            </Typography>
                            :
                            <Typography>
                                {info.name}
                            </Typography>
                        }
                    </div>
                    
                    <Typography >
                        {chat.message}
                    </Typography>

                    <Typography style={{display:"flex",margin:10}}>
                        {chat.createdAt}
                    </Typography>

                </div>
            </Card>
            
            
        </div>
    )
}

function SendMessage(props){
    const {roomId,isCandidate} = props;
    const [text,setText] = React.useState("");
    const [media,setMedia] = React.useState("");
    const [progress,setProgress] = React.useState(false); 

    var sender;

    const handleSubmit = ()=>{
        const chat = {
            room:roomId,
            message:text,
            media:media,
            isCandidate:isCandidate,
            sender:sender,
        }

        socket.emit("chat_receive",chat);
    }

    const handleAttach = (event)=>{
        setProgress(true);
        const file = event.target.files[0];
        const path = "room/chat/"+roomId+new Date().getTime();
        uploadFile(file,path)
        .then((snapshot)=>{
            setProgress(false);
            setMedia(path);
        })


    }

    const handleAttachRemove = ()=>{
        setMedia("");

        //Removing the file
    }

    useEffect(()=>{
        if(isCandidate){
            sender = CandidateData.getCandidateId();
        }else{
            sender = UserData.getProfileData()._id;
        }
    },[1])


    return(
        <div>
            <div>
            <TextField
                onChange={(event)=>{setText(event.target.value)}}/>
            <Button onClick = {handleSubmit}>
                Send
            </Button>
            </div>

            <div>
                Attach File
                <Input type="file" onChange={handleAttach}/>
                {progress?<CircularProgress/>:<div/>}
                {media?<div>File Attached</div>:<div/>}
                <Button onClick = {handleAttachRemove}>
                    Remove File
                </Button>
            </div>
            
        </div>
    )
}

function ChatWindow(props){
    const {roomId,isCandidate,onClose} = props;
    var [chats,setChats] = React.useState([]);

    useEffect(()=>{
        getChats(roomId).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Chat Response",res);
            if(res.success){
                setChats(res.chats);
            }
        });

        socket.on("chat_send/"+roomId,(data)=>{
            chats = [...chats,data];
            setChats(chats);
        });
    },[1])

    return(
        <div style={{display:"flex", flexDirection:"column",margin:5, padding:10, borderStyle:"solid", borderRadius:10}}>
            <div style={{display:"flex"}}>
                <div style={{display:"flex",flexGrow:1}}>
                    <Typography variant="h4">
                        Chat Window
                    </Typography>
                </div>

                
                

                <IconButton onClick={()=>onClose()}>
                    <Close/>
                </IconButton>
            </div>
            <div style={{display:"flex",flexGrow:1,flexDirection:"column"}}>
                {chats.map((item,index)=>(
                    <Chat chat = {item}/>
                ))}
            </div>
            <div>
                <SendMessage roomId ={roomId} isCandidate = {isCandidate}/>
            </div>
        </div>
    )
}

export default withRouter(ChatWindow);