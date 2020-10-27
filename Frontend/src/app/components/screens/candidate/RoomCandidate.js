import React from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor';
import ChatWindow from '../../organism/ChatWindow'

import {CandidateData} from '../../../utils/localStorage'


function RoomCandidate(props){
    const {id} = useParams();

    return(
        <div style={{display:"flex",flexGrow:1}}>

            <div style={{display:"flex", flexGrow:1,flexDirection:"column"}}>
                Candidate Room
                
                <CodeEditor roomId = {id}/>
                
            </div>
            <div style={{display:"flex"}}>
                <ChatWindow roomId = {id} isCandidate = {true}/>
            </div>
            
        </div>
    )
}

export default withRouter(RoomCandidate);