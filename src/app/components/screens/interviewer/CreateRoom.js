import React from 'react';
import {withRouter} from 'react-router-dom'

import {Typography, Snackbar} from '@material-ui/core'
import {Done} from '@material-ui/icons'

import CreateRoomForm from '../../molecules/CreateRoomForm';
import FloatingAction from '../../atoms/FloatingAction';

import {createRoom} from '../../../utils/api/controllers/roomCtrl'


function CreateRoomScreen(props){

    const [showSnackBar,setShowSnackBar] = React.useState(false);

    var data ={
        title:"",
        fields:{},
        password:"",
    }

    const validate = () => {
        if(data.title == ""){
            return false;
        }else if(data.fields == {}){
            return false;
        }else if(data.password == ""){
            return false;
        }

        return true;
    }

    const handleSubmit = ()=>{
        if(!validate()){
            setShowSnackBar(true);
            return;
        }
        
        createRoom(data).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){

                console.log("Room Created!", res.room);
                props.history.push('../room/'+res.room._id);
            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }

    return(
        <div style={{display:"flex",flexGrow:1, flexDirection:"column",alignContent:"center", margin:20}}  >

            <Typography variant ="h4">
                Create Room
            </Typography>
            
            <div style={{display:"flex", justifyContent:"center"}}>
                <CreateRoomForm data = {data}/>
                
            </div>
            <FloatingAction icon = {Done} text="Create" onClick={handleSubmit}/>

            <Snackbar open = {showSnackBar} message="Please fill all the entries!" onClose={()=>setShowSnackBar(false)}/>
            
        </div>
    )
}

export default withRouter(CreateRoomScreen);