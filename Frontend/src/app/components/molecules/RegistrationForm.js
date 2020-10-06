import React from 'react'

import { Button, TextField, Input,CircularProgress, Snackbar} from '@material-ui/core'
import {uploadFile} from '../../utils/firebase/storage';
import {UserData} from '../../utils/localStorage'

import AvatarIcon from '../../res/icons/user.png'

function ImageUploader(props){
    const onUpload = props.onUpload;
    const uploadState = props.uploadState;

    const [uploading,setUploading] = React.useState(false);
    const [image,setImage] = React.useState(AvatarIcon);
    const [snackbarStatus, setSnackbarStatus] = React.useState(false);


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
    const onSubmit = props.onSubmit;

    const [imageUploading, setImageUploading] = React.useState(false);

    var data={
        name:"",
        phone:"",
        company:"",
        website:"",
        photo:"",

    }    

    return(
        <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>

            <ImageUploader onUpload={(path)=>{data.photo= path}} uploadState={imageUploading}/>
    
            <TextField
                style={{marginTop:20}}
                variant="outlined"
                label="Name"
                onChange={(event)=>{data.name = event.target.value}}/>
            <TextField
                style={{marginTop:20}}
                variant="outlined"
                label="Phone"
                onChange={(event)=>{data.phone = event.target.value}}/>
            <TextField
                style={{marginTop:20}}
                variant="outlined"
                label="Company or Organisation"
                onChange={(event)=>{data.company = event.target.value}}/>
            <TextField
                style={{marginTop:20}}
                variant = "outlined"
                label ="Website"
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
