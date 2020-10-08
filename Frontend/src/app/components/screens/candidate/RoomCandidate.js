import React from 'react'
import {withRouter} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor';


function RoomCandidate(props){

    return(
        <div>
            Candidate room
            <CodeEditor/>
        </div>
    )
}

export default withRouter(RoomCandidate);