import React from 'react'
import {HashRouter,Switch, Route,withRouter} from 'react-router-dom'

import LoginScreen from './components/screens/LoginScreen'
import 

function Main(props){


    return (
        <div>
            <HashRouter>
                <Route exact path= "/" component={(LoginScreen)}/>
                <Route path="/register" component = {
                    }/>
            </HashRouter>
        </div>
    )
}

export default Main;