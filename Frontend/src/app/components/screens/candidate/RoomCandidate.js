import React from 'react'
import {withRouter} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor';

import {CandidateData} from '../../../utils/localStorage'


function RoomCandidate(props){

    return(
        <div>
            Candidate room
            <CodeEditor roomId={CandidateData.getRoomId()}/>
        </div>
    )
}

export default withRouter(RoomCandidate);