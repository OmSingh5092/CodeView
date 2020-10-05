import React from 'react'

import { FormControl, TextField,InputLabel, FilledInput,InputAdornment,IconButton } from '@material-ui/core'
import {Visibility,VisibilityOff} from '@material-ui/icons'

function CandidateLogin(props){
    const onSubmit = props.onSubmit;
    var data = {
        email:"",
        password:"",
    }
    const handleForm = (event)=>{

    }
    return (
        <div>
            <TextField
                label="Email"
                variant="outlined"
                onChange={(event)=>{data.email = event.target.value}}/>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
        </FormControl>
        </div>
    )
}

export default CandidateLogin;