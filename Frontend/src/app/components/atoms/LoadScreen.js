import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react'

function LoadScreen(props){
    const {title} = props;
    return(
        <div style={{display:"flex",flexGrow:1, flexDirection:"column"}}>
            <Typography variant="h2">
                {title}
            </Typography>
            <CircularProgress
                variant="indeterminate"
                size={50}/>
        </div>
    )
}

export default LoadScreen