import { Button, Chip, MenuItem, TextField, Typography } from '@material-ui/core';
import React from 'react'
import {withRouter} from 'react-router-dom';

import {Add,TextFields,FormatListNumbered, HighlightOff} from '@material-ui/icons'

function CreateRoomForm(props){
    const onSubmit = props.onSubmit;

    const [fields, setFields] = React.useState([]);
    const [fieldName, setFieldName] = React.useState("");
    const [fieldType,setFieldType] = React.useState("");
    var data ={
        title:"",
        fields:{}
    }

    return(
        <div style={{display:"flex" , flexDirection:"column", flexWrap:"wrap"}}>
            <Typography >
                Please enter the details
            </Typography>
            <TextField 
                style={{margin:10}}
                label="Title"
                variant="outlined"
                style={{}}
                onChange={(event)=>{data.title = event.target.value}}/>

            

            <div style={{display:"flex",flexWrap:"wrap", width:300}}>
                {fields.map((item,index)=>(
                    <Chip
                        style={{margin:10}}
                        icon={item.type == "number"?<FormatListNumbered/>:<TextFields/>}
                        label={item.name}
                        color="secondary"
                        onDelete={()=>{fields.splice(index,1); setFields(fields);}}/>
                ))}
            </div>

            <div style={{display:"flex", flexWrap:"wrap", flexDirection:"column",flexGrow:1, marginTop:20}}>
                <Typography >
                    Make Candidate Input Fields
                </Typography>
                <div style={{display:"flex", marginTop:10, marginBottom:10}}> 
                    <TextField
                        style={{marginRight:10, width:150}}
                        select
                        onChange={(event)=>{setFieldType(event.target.value)}}
                        variant="outlined"
                        label="Input Type"
                        helpderText="Please select number or text">
                            <MenuItem value="number">
                                Number
                            </MenuItem>
                            <MenuItem value="text">
                                Text
                            </MenuItem>
                    </TextField>
                    <TextField
                        style={{width:250}}
                        label="Field Name"
                        variant = "outlined"
                        style={{}}
                        onChange={(event)=>{setFieldName(event.target.value)}}/>
                </div>
                
                <div>
                    <Button onClick={()=>{fields.push({name:fieldName,type:fieldType}); setFieldName(""); setFieldType("") ;console.log(fields)}}  variant="contained" color="primary">
                        <Add/> Add
                    </Button>
                </div>
                
            </div>
        </div>
    )
}

export default withRouter(CreateRoomForm);