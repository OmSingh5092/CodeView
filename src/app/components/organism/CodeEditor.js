import React, { useEffect } from 'react'

import {socket} from '../../utils/websocket'
import {getRoom} from '../../utils/api/controllers/roomCtrl'

import {IconButton, MenuItem, Switch, TextField,Typography,Button} from '@material-ui/core'
import {BrightnessHigh,Brightness4, Language} from '@material-ui/icons'

import {CandidateData,UserData} from '../../utils/localStorage'

import AceEditor from "react-ace";

//Importing ace editor styles
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/mode-css'

import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-kuroir'


const languages = ["Java","C++14","JavaScript","Python"];
const modes  = ["java",'c_cpp',"javascript","python"];
const themes = ["kuroir","monokai"];
const hackerEarthLang = ["JAVA","CPP14", "JAVASCRIPT_NODE", "PYTHON3"]


function CodeCompiler(props){
    const {code, lang} = props;
    const [inputs,setInputs] = React.useState("");
    const [output,setOutput] = React.useState("");

    const handleCompile = ()=>{
        
        
    }   
    
    const handleRun = ()=>{
    }

    return(
        <div style={{display:"flex",flexDirection:"column",}}>

            <div style={{display:"flex",flexGrow:1}}>
                <TextField
                    style={{display:"flex", flexGrow:1, minHeight:100,margin:10}}
                    label="Inputs"
                    variant="outlined"
                    onChange={(event)=>{setInputs(event.target.value)}}
                />
                <div style={{borderStyle:"solid", borderRadius:10, margin:10,minHeight:100, minWidth:400}}>
                    <Typography >
                        Outputs
                    </Typography>
                    {output}
                </div>  
            </div>

            <div style={{margin:10}}>
                <Button onClick ={handleCompile} variant="outlined" color="primary" >
                    Compile
                </Button>

                <Button onClick = {handleRun} variant ="outlined" color="primary" style={{marginLeft:20}}>
                    Run
                </Button>
            </div>
            

                      
        </div>

    )
}



function CodeEditor(props){
    const {roomId} = props;
    const [code,setCode] = React.useState("");

    var sender;

    if(CandidateData.candidateExists()){
        sender = CandidateData.getCandidateId();
    }else{
        sender = UserData.getProfileData()._id;
    }

    

    const [language,setLanguage] = React.useState(0);
    const [theme,setTheme] = React.useState(0);
    const [fontSize,setFontSize] = React.useState(14);

    useEffect(()=>{
        getRoom(roomId).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Response",res);
            if(res.success){
                setCode(res.room.code);
                socket.on(roomId+"/updateCode",(data)=>{
                    console.log("Data Received",data);
                    if(data.sender != sender){
                        setCode(data.code);
                        setLanguage(data.language);
                    }
                })
            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    },[1])



    return(
        <div style={{display:"flex",flexGrow:1,flexDirection:"column", borderStyle:"solid", borderRadius:10,padding:10}}>
            <div style={{display:"flex",}}>

                    <Typography style={{display:"flex",flexGrow:1, fontSize:30}}>
                        Code Editor
                    </Typography>
                    
                    <TextField
                        style={{minWidth:400,margin:10}}
                        select
                        value = {language}
                        onChange={(event)=>{setLanguage(event.target.value); socket.emit('code',{code:code,language:event.target.value,room:roomId})}}
                        label="Language"
                        variant="outlined">

                        {languages.map((item,index)=>(
                            <MenuItem value={index} key={index}>
                                {item}
                            </MenuItem>
                        ))}

                    </TextField>
                

                <IconButton onClick={()=>{
                    console.log("Theme",theme);
                    if(theme ==0){
                        setTheme(1);
                    }else{
                        setTheme(0);
                    }
                
                }}
                    style={{margin:10}}>
                    {theme?
                        <BrightnessHigh/>:
                        <Brightness4/>}
                </IconButton>
            </div>
            <div style={{display:"flex",flexGrow:1,margin:10}}>
                <AceEditor
                style={{display:"flex",flexGrow:1,width:"100%",height:"100%"}}
                placeholder="Type Code Here"
                mode={modes[language]}
                theme={themes[theme]}
                onChange={(value) => {
                    setCode(value);
                    socket.emit('code',{code:value,language:language,room:roomId,sender:sender});
                }}
                fontSize={fontSize} 
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

            <CodeCompiler code = {code} lang = {language}/>
            
        </div>
    )
}

export default CodeEditor;