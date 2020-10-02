import {createMuiTheme} from '@material-ui/core'
import {} from '@material-ui/core/colors'

const appTheme = createMuiTheme({
    palette:{
        primary:{
            main:"#000239",
            light: "#ECEDFF",
        }
    },
    typography:{
        fontFamily:'"Raleway-Black","Raleway-Medium"'
    }
})  

export {appTheme};