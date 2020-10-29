import React from 'react'
import {withRouter} from 'react-router-dom'

import {Fab} from '@material-ui/core'

const FloatingAction = withRouter((props)=>{
    const Icon = props.icon;
    const text = props.text;
    const onClick = props.onClick;
    return(
        <Fab variant="extended" color="secondary"  style={{position:"absolute", bottom:30, right:30}}
            onClick={onClick}
        >
            <Icon/>
            {text}
        </Fab>
    )
});

export default FloatingAction;