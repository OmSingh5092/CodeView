import {createMuiTheme} from '@material-ui/core'
import {blue,green} from '@material-ui/core/colors'

const appTheme = createMuiTheme({
    palette:{
        primary:blue,
        secondary:green
    },
    typography:{
        fontFamily:"'Roboto-Medium','Roboto-Black'"
    }
})  

export {appTheme};