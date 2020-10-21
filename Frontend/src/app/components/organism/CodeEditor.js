import React, { useEffect } from 'react'

import {socket} from '../../utils/websocket'
import {getRoom} from '../../utils/api/controllers/roomCtrl'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {UnControlled as CodeMirror} from 'react-codemirror2' 
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');



function CodeEditor(props){
    const {roomId} = props;
    const [code,setCode] = React.useState("");

    useEffect(()=>{
        getRoom(roomId).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Response",res);
            if(res.success){
                setCode(res.room.code);
                socket.on(roomId+"/updateCode",(data)=>{
                    setCode(data);
                    console.log("Received Data", data);
                })
            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
        
    },[1])

    return(
        <div>
            <CodeMirror
                value={code}
                options={{
                    mode: 'xml',
                    theme: 'material',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                    socket.emit('code',{code:value,room:roomId});
                }}
            />
        </div>
    )
}

export default CodeEditor;