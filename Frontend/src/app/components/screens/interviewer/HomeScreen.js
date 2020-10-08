import React from 'react'
import {withRouter, HashRouter, Route, Switch} from 'react-router-dom'

import {AppBar, Breadcrumbs, Button, Fab, IconButton, Toolbar, Typography, Link} from '@material-ui/core'
import {AccountBox,Language,Notifications,Add,Home} from "@material-ui/icons"
import '../style.css'

import Avatar from '../../../res/icons/coding.png'

import CreateRoom from './CreateRoom';
import PastInterviews from './PastInterviews';
import Profile from './Profile';

import {UserData} from '../../../utils/localStorage'

function Header(props){

    return(
        <AppBar position="static">
            <Toolbar style={{padding:10}}>
                <div>
                    <img src = {Avatar} style={{height:100, width:100, }} />
                </div>
                <Typography variant="h3" style={{fontFamily:"Roboto-Black", flexGrow:1, margin:20,}} >
                    Om Singh 
                </Typography>
                <Typography variant="h6" style={{fontFamily:"Roboto-Black", flexGrow:1, margin:20, color:"#000000"}} >
                    Motilal Nehru National Institute of Technology
                </Typography>
                
                <div>
                    <IconButton size="medium" color="inherit">
                        <Language/>
                    </IconButton>
                    <IconButton size="medium" color="inherit">
                        <AccountBox/>
                    </IconButton>
                    <IconButton size="medium" color="inherit">
                        <Notifications/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

const CreateRoomButton = withRouter((props)=>{
    return(
        <Fab variant="extended" color="secondary"
            onClick={()=>{props.history.push('createRoom')}}
        >
            <Add/>
            Add Interview Room
        </Fab>
    )
})

function HomeScreen(props){
    const [bodyState,setBodyState] = React.useState('home');  

    return(
        <div className="root">

            <HashRouter basename="/interviewer">
                <Header/>   
                <Switch>
                    <Route exact path = "/" componet = {(PastInterviews)}/>
                    <Route path="/createRoom" component={(CreateRoom)}/>
                    <Route path="/profile" component = {(Profile)}/>
                </Switch>
                <div style={{position:"absolute", bottom:30, right:30}}>
                    <CreateRoomButton/>
                </div>
                
            </HashRouter>
        </div>
    )
}

export default withRouter(HomeScreen);