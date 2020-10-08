import React from 'react'

import { FormControl, TextField,InputLabel, OutlinedInput,InputAdornment,IconButton,Button } from '@material-ui/core'
import {Visibility,VisibilityOff} from '@material-ui/icons'

function JoinRoomForm(props){
    const onSubmit = props.onSubmit;
    var data = {
        roomId:"",
        password:"",
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
                onChange={(event)=>{data.email = event.target.value}}/>
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
        <Button style={{marginTop:10}} onClick={()=>onSubmit(data)} variant="contained" color="secondary">
                    Join Room
                </Button>
        </div>
    )
}

export default JoinRoomForm;