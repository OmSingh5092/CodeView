import React from 'react'
import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'
import {useEffect} from 'react'

import LoginScreen from './components/screens/LoginScreen'



function Main(props){

    const [scriptLoading, setScriptLoading] = React.useState(false);

    useEffect(()=>{
        const googleSigninScript = document.createElement('script');
        googleSigninScript.src = "https://apis.google.com/js/platform.js";
        googleSigninScript.onload = ()=>{};
    },[1])


    return (
        <div>
            
            <HashRouter>
                <Route exact path= "/" component={(LoginScreen)}/>
                
            </HashRouter>
        </div>
    )
}

export default Main;