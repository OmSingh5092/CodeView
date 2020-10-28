import React from 'react'
import {useEffect} from 'react'
import {withRouter, HashRouter, Route, Switch} from 'react-router-dom'

import {AppBar, Breadcrumbs, Button, Fab, IconButton, Toolbar, Typography, Link, Menu, MenuItem, Badge} from '@material-ui/core'
import {AccountBox,Language,Notifications,Add,Home, Create} from "@material-ui/icons"
import '../style.css'

import Avatar from '../../../res/icons/coding.png'

import CreateRoom from './CreateRoom';
import PastInterviews from './PastInterviews';
import Profile from './Profile';
import RoomInterviewer from './RoomInterviewer'

import AuthRedirect from '../../atoms/RedirectRoute'

import {getProfile} from '../../../utils/api/controllers/interviewerCtrl'

import {UserData} from '../../../utils/localStorage'
import { socket } from '../../../utils/websocket'
import {addInterviewer} from '../../../utils/api/controllers/roomCtrl'

function RequestMenu(props){
    const {open,requests,onAccept,onReject, onClose} = props;

    useEffect(()=>{
        console.log("Requests",requests);
    },[1])

    return(
        <div>
            <Menu open = {open} anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  
                }} onClose={onClose}
                style={{padding:20}}>

                <div>
                    Room Requests
                </div>
                <div style={{display:"flex", flexDirection:"column", margin:20}}>
                    {requests.map((item,index)=>(
                        <div>
                            Request by - {item.email} 
                            <br/>
                            Room Id - {item.room}
                            <br/>
                            <Button onClick = {()=>{onAccept(item)}}>
                                Accept
                            </Button>
                            <Button onClick = {()=>onReject(item)}>
                                Reject
                            </Button>
                        </div>
                    ))}
                </div>
            </Menu>
        </div>
    )

}

const  Header = withRouter(function(props){
    const [profile,setProfile] = React.useState({});
    const [requests,setRequests] = React.useState([]);
    const [requestMenuOpen,setRequestMenuOpen] = React.useState(false);

    useEffect(()=>{
        console.log("Id",UserData.getProfileData());
        socket.on("interviewer_wait/"+UserData.getProfileData()._id, (data)=>{
            console.log("Request",data);
            setRequests([...requests,data]);
        })
    },[1])

    const handleRequestAccept = (request)=>{
        socket.emit("interviewer_accept",{room:request.room,interviewer:UserData.getProfileData()._id,res:true,});
        
        addInterviewer(request.room).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                //Joining the room
                props.history.push('room/'+request.room);
            }
        })
    }

    const handleRequestReject = (request)=>{
        socket.emit("interviewer_accept",{room:request.room,interviewer:UserData.getProfileData()._id,res:false,});
    }


    return(
        <AppBar position="static">
            <Toolbar style={{padding:10}}>
                <div>
                    <img src = {Avatar} style={{height:100, width:100, }} />
                </div>
                <Typography variant="h3" style={{fontFamily:"Roboto-Black", flexGrow:1, margin:20,}} >
                    {UserData.getProfileData().name}
                </Typography>
                <Typography variant="h6" style={{fontFamily:"Roboto-Black", flexGrow:1, margin:20, color:"#000000"}} >
                    {UserData.getProfileData().company}
                </Typography>
                
                <div>
                    <IconButton size="medium" color="inherit" onClick = {()=>{
                        window.open(UserData.getProfileData().website,'_blank');
                    }}>
                        <Language/>
                    </IconButton>
                    <IconButton size="medium" color="inherit">
                        <AccountBox/>
                    </IconButton>
                    <IconButton size="medium" color="inherit" onClick={()=>{setRequestMenuOpen(true)}}>
                        <Badge badgeContent={requests.length} color="secondary">
                            <Notifications/>
                        </Badge>
                        
                    </IconButton>

                    <RequestMenu onAccept={handleRequestAccept} onReject={handleRequestReject} requests={requests} open = {requestMenuOpen} onClose= {()=>{setRequestMenuOpen(false)}}/>
                </div>
            </Toolbar>
        </AppBar>
    )
})

function HomeScreen(props){
    const [bodyState,setBodyState] = React.useState('Home');  

    
    return(
        <div className="root">
            <AuthRedirect/>
            <HashRouter basename="/interviewer" >
                <Header/>   
                <Switch>
                    <Route exact path = "/" component = {(PastInterviews)}/>
                    <Route path="/createRoom" component={(CreateRoom)}/>
                    <Route path="/profile" component = {(Profile)}/>
                </Switch>
            </HashRouter>
        </div>
    )
}

export default withRouter(HomeScreen);