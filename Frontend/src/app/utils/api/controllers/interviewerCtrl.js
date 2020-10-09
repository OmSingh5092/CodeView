import {interviewerEndPoints} from '../endpoints'
import {UserData} from '../../localStorage'

export const updateProfile = (data)=>{
    console.log("Data",JSON.stringify(data));
    const requestOptions = {
        method:"POST",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json',},
        body: JSON.stringify(data)
    }

    return fetch(interviewerEndPoints.updateProfile, requestOptions);

}

export const getProfile = ()=>{
    const requestOptions = {
        method:"GET",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json'},
    }

    return fetch(interviewerEndPoints.getOwnProfile, requestOptions);
}