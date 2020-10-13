import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'

import {checkInterviewer} from '../../../utils/api/controllers/roomCtrl'

function InterviewScreen(props){

    return(
        <div>
            <CodeEditor/>
        </div>
    )
}

function RoomInterviewer(props){
    const {id} = useParams();
    const [checkStatus, setCheckStatus] = React.useState(false);

    useEffect(()=>{
        checkInterviewer(id).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Response",res);
            if(res.success){
                if(res.exists){
                    setCheckStatus(true);
                }else{
                    props.history.push('../../');
                }
            }else{
                props.history.push('../../');
            }
        })
    },[])

    return(
        <div>
            {checkStatus?<InterviewScreen/>:<LoadScreen title="Checking the interviewer"/>}
        </div>
    )
}

export default withRouter(RoomInterviewer);