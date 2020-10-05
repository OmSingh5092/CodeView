import React from 'react'
import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'
import {useEffect} from 'react'
import {firebaseConfig} from './config'

import LoginScreen from './components/screens/LoginScreen'

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

        const firebaseScript = document.createElement('script');
        firebaseScript.src = "https://www.gstatic.com/firebasejs/7.22.0/firebase-app.js";
        firebaseScript.onload = ()=>{
            window.firebase.initializeApp(firebaseConfig);
            setScriptLoading(scriptLoading+1);
        };
        
        document.body.append(firebaseScript);
        document.body.append(googleSigninScript);
    },[1])


    return (
        <div>
            {scriptLoading == scriptCount?<LoadingScreen/>:
            <HashRouter>
                <Route exact path= "/" component={(LoginScreen)}/>
                
            </HashRouter>}
        </div>
    )
}

export default Main;