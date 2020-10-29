import React from 'react'
import {withRouter} from 'react-router-dom'
import { FormControl, TextField,InputLabel, OutlinedInput,InputAdornment,IconButton,Button } from '@material-ui/core'
import {Visibility,VisibilityOff} from '@material-ui/icons'

import {checkRoom} from '../../utils/api/controllers/roomCtrl'
import {CandidateData} from '../../utils/localStorage'

function JoinRoomForm(props){
    const onSubmit = props.onSubmit;
    var data = {
        room:"",
        password:"",
    }

    const handleSubmit = ()=>{
        console.log("Data",data);
        checkRoom(data).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Response",res);
            if(res.success){
                if(res.verified){
                    CandidateData.setRoomId(data.room);
                    props.history.push('/joinRoom');
                }else{

                }
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }
    

    const [showPassword,setShowPassword] = React.useState(false);
    return (
        <div style={{
            display:"flex",
            flexDirection:"column"
        }}>
            <TextField
                style={{marginTop:10}}
                label="Room Id"
                variant="outlined"
                onChange={(event)=>{data.room = event.target.value}}/>
            <FormControl variant="outlined" style={{marginTop:10}}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    type={showPassword? 'text' : 'password'}
                    onChange={(event)=>{data.password = event.target.value}}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={()=>setShowPassword(!showPassword)}
                            edge="end"
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
        <Button style={{marginTop:10}} onClick={handleSubmit} variant="contained" color="secondary">
                    Join Room
                </Button>
        </div>
    )
}

export default withRouter(JoinRoomForm);