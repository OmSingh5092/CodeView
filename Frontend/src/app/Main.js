import React from 'react'
import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'
import {useEffect} from 'react'
import {firebaseConfig} from './config'
import firebase from 'firebase'

import LoginScreen from './components/screens/LoginScreen'
import RegistrationScreen from './components/screens/RegisterScreen'
import HomeScreen from './components/screens/interviewer/HomeScreen'

import {UserData} from './utils/localStorage'

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

        const googleSigninScript = document.createElement('script');
        googleSigninScript.src = "https://apis.google.com/js/platform.js";
        googleSigninScript.onload = ()=>{setScriptLoading(scriptLoading+1)};    

        document.body.append(googleSigninScript);
    },[1])


    return (
        <div>
            {scriptLoading == scriptCount?<LoadingScreen/>:
            <HashRouter>
                <Switch>    
                    <Route exact path= "/" component={(LoginScreen)}/>
                    <Route path="/register" component={(RegistrationScreen)}/>
                    <Route path = "/interviewer" component={(HomeScreen)}/>
                </Switch>
            </HashRouter>}
        </div>
    )
}

export default Main;