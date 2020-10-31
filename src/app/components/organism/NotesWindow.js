import { Input, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'

import {Typography,IconButton} from '@material-ui/core'
import {Close} from '@material-ui/icons'

import {getNotes,updateNotes} from '../../utils/api/controllers/notesCtrl'

function NotesWindow(props){
    const {roomId,onClose} = props;

    const [note,setNote]= React.useState("");

    useEffect(()=>{
        getNotes(roomId).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                if(res.note){
                    setNote(res.note.note);
                }
                
            }
        })
    },[1])

    const handleNoteChange = (event)=>{
        const value = event.target.value;
        updateNotes(roomId,value).then((res)=>(res.json()))
        .then((res)=>{

        })
    }

    return(
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,margin:5, padding:10, borderStyle:"solid", borderRadius:10}}>
        
            <div style={{display:"flex"}}>
                <div style={{display:"flex",flexGrow:1}}>
                    <Typography variant="h4">
                        Notes Window
                    </Typography>
                </div>

                <IconButton onClick={()=>onClose()}>
                    <Close/>
                </IconButton>
            </div>
            <TextareaAutosize defaultValue={note} onChange = {handleNoteChange}/>
        </div>
    )
}

export default NotesWindow;