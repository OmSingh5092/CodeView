import React from 'react'
import {withRouter} from 'react-router-dom';

import {TextField,Button} from '@material-ui/core'
import {FileCopy} from '@material-ui/icons'

import {CandidateData} from '../../utils/localStorage'
import {getProfile} from'../../utils/api/controllers/candidateCtrl'

function RoomDetailsForm(props){
    const {onSubmit,fields} = props;

    const roomId = CandidateData.getRoomId();
    const [details,setDetails] = React.useState([]);

    if(CandidateData.candidateExists()){
        getProfile().then((res)=>(res.json()))
        .then((res)=>{
            if(res.success){
                details = res.candidate;
            }else{
                
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
                    value={details[item.name]}
                    inputMode={item.type == "number"? "decimal":"text"}/>
            ))}

            <Button color="primary" variant ="contained" style={{marginTop:10}}>
                Submit Details
            </Button>   
        </div>
    )
}

export default withRouter(RoomDetailsForm);