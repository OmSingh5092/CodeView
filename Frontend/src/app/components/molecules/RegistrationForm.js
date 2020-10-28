import React, { useEffect } from 'react'

import { Button, TextField, Input,CircularProgress, Snackbar} from '@material-ui/core'
import {uploadFile,downloadFile} from '../../utils/firebase/storage';
import {UserData} from '../../utils/localStorage'

import AvatarIcon from '../../res/icons/user.png'

function ImageUploader(props){
    const {onUpload,uploadState,path} = props;

    const [uploading,setUploading] = React.useState(false);
    const [image,setImage] = React.useState(AvatarIcon);
    const [snackbarStatus, setSnackbarStatus] = React.useState(false);


    useEffect(()=>{
        if(path == null){
            return;
        }
        downloadFile(path).then((url)=>{
            console.log("URL",url);
        })

    },[1])


    const handleImageSelect = (event)=>{
        setImage(URL.createObjectURL(event.target.files[0]));
        const file = event.target.files[0];
        setUploading(true);
        const path = "profile/"+UserData.getEmail()+"/profileImage.jpg";
        uploadFile(file,path)
        .then((snapshot)=>{
            setUploading(false);
            console.log("Upload Successfull!");
            onUpload(path);
            
        }).catch((err)=>{
            console.log("Error",err);

        })
    }

    return(
        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
            <div>
                <img src = {image} style={{height:140,width:140, borderRadius:70, outlineColor:"#000000",}}/> 
            </div>
            <div style={{display:"flex",alignContent:"center", flexWrap:"wrap", marginLeft:40}}>
                <Input type="file" onChange={handleImageSelect}/>
                {uploading? <CircularProgress/>:<div/> }
            </div>

            <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={()=>{setSnackbarStatus(false)}}>
                Upload Successfull
            </Snackbar>
            
        </div>
    )
}

function RegistrationForm(props){
    var {onSubmit,data} = props;
    if(data == null){
        data = {
            name:"",
            phone:"",
            company:"",
            website:"",
            photo:"",
    
        }
    }

    const [imageUploading, setImageUploading] = React.useState(false);    

    useEffect(()=>{
        if(data == null){
            
            return;
        }
        
    },[1])

    return(
        <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>

            <ImageUploader path={data.photo} onUpload={(path)=>{data.photo= path}} uploadState={imageUploading}/>
    
            <TextField
                style={{marginTop:20}}
                variant="outlined"
                label="Name"
                defaultValue={data.name}
                onChange={(event)=>{data.name = event.target.value}}/>
            <TextField
                style={{marginTop:20}}
                variant="outlined"
                label="Phone"
                defaultValue={data.phone}
                onChange={(event)=>{data.phone = event.target.value}}/>
            <TextField
                style={{marginTop:20}}
                variant="outlined"
                label="Company or Organisation"
                defaultValue={data.company}
                onChange={(event)=>{data.company = event.target.value}}/>
            <TextField
                style={{marginTop:20}}
                variant = "outlined"
                label ="Website"
                defaultValue = {data.website}
                onChange = {(event)=>{data.website = event.target.value}}/>
            <div style={{flexGrow:1}}>
                <Button variant="contained" color="primary" style={{marginTop:30}} onClick={()=>{onSubmit(data)}}>
                    Submit
                </Button>
            </div>
            
        </div>
    )
}

export default RegistrationForm;
