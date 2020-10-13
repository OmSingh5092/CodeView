import React, { useEffect } from 'react'
import {withRouter,useParams} from 'react-router-dom'

import CodeEditor from '../../organism/CodeEditor'
import LoadScreen from '../../atoms/LoadScreen'

import {checkInterviewer} from '../../../utils/api/controllers/roomCtrl'

function InterviewScreen(props){
    const {roomId} = props;
    return(
        <div>
            <CodeEditor roomId = {roomId}/>
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
            {checkStatus?<InterviewScreen roomId = {id}/>:<LoadScreen title="Checking the interviewer"/>}
        </div>
    )
}

export default withRouter(RoomInterviewer);