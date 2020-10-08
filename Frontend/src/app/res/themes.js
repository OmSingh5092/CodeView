import {createMuiTheme} from '@material-ui/core'
import {teal,indigo} from '@material-ui/core/colors'

const appTheme = createMuiTheme({
    palette:{
        primary:indigo,
        secondary:teal
    },
    typography:{
        fontFamily:"'Roboto-Medium','Roboto-Black'"
    }
})  

export {appTheme};