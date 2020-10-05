import React from 'react'

import {Button} from '@material-ui/core'

function LoginScreen(props){

    return(<div>
        <Button>
            Sign in as interviewer
        </Button>
        <Button>
            Join interview room
        </Button>
    </div>)
}

export default LoginScreen;