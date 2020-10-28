import React, { useEffect } from 'react'
import { Button, CircularProgress, Snackbar, TextField,Input, IconButton, Typography, Card } from '@material-ui/core'
import {withRouter} from 'react-router-dom'

import {getChats} from '../../utils/api/controllers/chatCtrl'
import {uploadFile} from '../../utils/firebase/storage'

import {UserData,CandidateData} from '../../utils/localStorage'
import {socket} from '../../utils/websocket'
import { AttachFile, Close, CloudDownload, Delete, Send } from '@material-ui/icons'

import {getProfileById} from '../../utils/api/controllers/interviewerCtrl'
import {parseDate} from '../../utils/timeFormatter'

function Chat(props){
    const {chat} = props; 
    var isSelf;
    var backColor = "#c2cbff";

    if(chat.isCandidate){
        backColor = "#9effb8"
    }
    if(UserData.getProfileData()){
        isSelf = chat.sender == UserData.getProfileData()._id;
    }else if(chat.isCandidate){
        isSelf = true;
    }else{
        isSelf = false;
    }

    var chatMarginLeft ;
    if(isSelf){
        chatMarginLeft="auto"
    }else{
        chatMarginLeft = 0;
    }
    

    const [info,setInfo] = React.useState({});
    useEffect(()=>{
        if(chat.isCandidate){
            return;
        }

        console.log("Chat",chat);

        getProfileById(chat.sender).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                setInfo(res.interviewer);
            }
        })

    },[1])

    const handleDownload= ()=>{
        window.open(chat.media,"_blank");
    }

    return(
        <div style={{display:"flex",flexWrap:"wrap",margin:10,marginLeft:chatMarginLeft}}>
            <Card variant="contained" style={{backgroundColor:backColor}} >
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{margin:10}}>
                        {chat.isCandidate?
                            <Typography style={{fontSize:10}}>
                                Candidate
                            </Typography>
                            :
                            <Typography style={{fontSize:10}}>
                                {info.name}
                            </Typography>
                        }
                    </div>
                    
                    <Typography style={{marginLeft:10,marginRight:10}} >
                        {chat.message} 
                    </Typography>

                    {chat.media?
                        <IconButton href={chat.media}>
                            <CloudDownload/>
                        </IconButton>
                        :
                        <div/>
                    }
                    
                    <Typography style={{display:"flex",margin:10, fontSize:10}}>
                        {parseDate(chat.createdAt)}
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

    if(isCandidate){
        sender = CandidateData.getCandidateId();
    }else{
        sender = UserData.getProfileData()._id;
    }

    const handleSubmit = ()=>{
        const chat = {
            room:roomId,
            message:text,
            media:media,
            isCandidate:isCandidate,
            sender:sender,
        }

        console.log("Chat",chat);

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
        
    },[1])


    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex",margin:10}}>
            <TextField
                label="Type Message"
                style={{display:"flex", flexGrow:1,marginRight:10}}
                onChange={(event)=>{setText(event.target.value)}}
                variant="outlined"/>
            <Button onClick = {handleSubmit} variant="contained" color ="primary" style={{display:"flex",flexWrap:"wrap"}}
                endIcon={<Send/>}
                >
                Send
            </Button>
            </div>

            <div style={{display:"flex", margin:10}}>
                <AttachFile/>
                <Input type="file" onChange={handleAttach}/>
                {progress?<CircularProgress/>:<div/>}
                {media?
                <IconButton onClick = {handleAttachRemove}>
                    <Delete/>
                </IconButton>
                :<div/>}
                
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
                chats = res.chats;
                setChats(chats);
            }
        });

        socket.on("chat_send/"+roomId,(data)=>{
            setChats([...chats,data]);
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
            <div style={{display:"flex",flexDirection:"column",flexGrow:1,height:0, overflowY:"scroll"}}> 
                {chats.map((item,index)=>(
                    <Chat chat = {item}/>
                    
                ))}
            </div>
            <div style={{display:"flex"}}>
                <SendMessage roomId ={roomId} isCandidate = {isCandidate}/>
            </div>
        </div>
    )
}

export default withRouter(ChatWindow);