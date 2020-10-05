import React from 'react'
import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'
import {useEffect} from 'react'

import LoginScreen from './components/screens/LoginScreen'

function LoadingScreen(props){

    return(
        <div>
            Loading...
        </div>
    )
}



function Main(props){

    const [scriptLoading, setScriptLoading] = React.useState(true);

    useEffect(()=>{
        const googleSigninScript = document.createElement('script');
        googleSigninScript.src = "https://apis.google.com/js/platform.js";
        googleSigninScript.onload = ()=>{setScriptLoading(false)};
        document.body.append(googleSigninScript);
    },[1])


    return (
        <div>
            {scriptLoading?<LoadingScreen/>:
            <HashRouter>
                <Route exact path= "/" component={(LoginScreen)}/>
    
            </HashRouter>}
            
            
        </div>
    )
}

export default Main;