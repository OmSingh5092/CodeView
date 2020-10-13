import React from 'react'
import {HashRouter,Switch, Route,withRouter,Redirect} from 'react-router-dom'
import {useEffect} from 'react'
import {firebaseConfig} from './config'
import firebase from 'firebase'

import LoginScreen from './components/screens/LoginScreen'
import RegistrationScreen from './components/screens/RegisterScreen'
import HomeScreen from './components/screens/interviewer/HomeScreen'
import JoinRoomScreen from './components/screens/candidate/JoinRoomScreen'

import RoomCandidate from './components/screens/candidate/RoomCandidate';
import RoomInterviewer from './components/screens/interviewer/RoomInterviewer';

import {UserData} from './utils/localStorage'
import RegisterScreen from './components/screens/RegisterScreen'

function LoadingScreen(props){

    return(
        <div>
            Loading...
        </div>
    )
}

function Main(props){

    const [scriptLoading, setScriptLoading] = React.useState(0);
    const scriptCount = 
    useEffect(()=>{       

    },[1])

    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path="/register"><RegistrationScreen/></Route>
                    <Route path = "/interviewer/room/:id"><RoomInterviewer/></Route>
                    <Route path = "/interviewer"><HomeScreen/></Route>
                    <Route path="/joinRoom"><JoinRoomScreen/></Route>
                    <Route path="/"><LoginScreen/></Route>
                </Switch>                
            </HashRouter>
        </div>
    )
}

export default Main;