import React, { useEffect } from 'react'

import {socket} from '../../utils/websocket'
import {getRoom} from '../../utils/api/controllers/roomCtrl'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"

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
        <div style={{display:"flex", flexGrow:1}}>
            <AceEditor
                style={{width:"100%",height:"100%"}}
                placeholder="Text"
                mode="java"
                theme="monokai"
                onChange={(value) => {
                    socket.emit('code',{code:value,room:roomId});
                }}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={false}
                value={code}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                }}/>
        </div>
    )
}

export default CodeEditor;