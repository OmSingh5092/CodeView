import React from 'react'
import {useEffect} from 'react'
import {withRouter} from 'react-router-dom';

import {TextField,Button} from '@material-ui/core'
import {FileCopy} from '@material-ui/icons'

import {CandidateData} from '../../utils/localStorage'
import {getProfile,createCandidite} from'../../utils/api/controllers/candidateCtrl'
import {getRoom} from '../../utils/api/controllers/roomCtrl'

function RoomDetailsForm(props){
    const [fields,setFields] = React.useState([]);
    const roomId = CandidateData.getRoomId();
    const [details,setDetails] = React.useState({});
    
    var room;
    
    useEffect(()=>{
        if(CandidateData.candidateExists()){
            console.log("Candidate Detected!");
            console.log("CandidateId", CandidateData.getCandidateId());
            getProfile().then((res)=>(res.json()))
            .then((res)=>{
                console.log(res.candidate);
                if(res.success){
                    setDetails(res.candidate.details);
                }else{
                    
                }
            }).catch((err)=>{
                console.log("Error",err);
    
            })
        }

        //Get fields
        getRoom(CandidateData.getRoomId()).then((res)=>(res.json()))
        .then((res)=>{
            console.log("Response",res);
            if(res.success){
                room = res.room;
                setFields(room.fields);
                
            }
        })




    },[1]);
    

    const handleFormSubmit = ()=>{
        console.log("Data",details);
        createCandidite(details).then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                console.log("Candidate created successfully");
                console.log("Response",res.candidate._id);
                CandidateData.setCandidateId(res.candidate._id);
            }else{
                console.log("Error",res.msg);
            }
        }).catch((err)=>{
            console.log("Error",err);
        })
    }

    return(
        <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", alignContent:"center"}}>
            
            <div style={{fontSize:30, textAlign:"center" }}>
                Candidate Details
            </div>
            {fields.map((item,index)=>(
                <TextField
                    style={{marginTop:10}}
                    label={item.name}
                    variant="outlined"
                    defaultValue={details[item.name]}
                    onChange={(event)=>{details[item.name] = event.target.value}}
                    inputMode={item.type == "number"? "decimal":"text"}/>
            ))}

            <Button color="primary" variant ="contained" style={{marginTop:10}} onClick={handleFormSubmit}>
                Submit Details
            </Button>   
        </div>
    )
}

export default withRouter(RoomDetailsForm);