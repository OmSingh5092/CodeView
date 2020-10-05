import {profileEndPoints} from '../endpoints'
import {UserData} from '../../localStorage'

export const updateProfile = (data)=>{
    const requestOptions = {
        method:"POST",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    return fetch(profileEndPoints.update, requestOptions);

}

export const getOwnProfile = ()=>{
    const requestOptions = {
        method:"GET",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json'},
    }

    return fetch(profileEndPoints.getOwnProfile, requestOptions);
}