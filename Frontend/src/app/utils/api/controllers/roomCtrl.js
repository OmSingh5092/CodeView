import {roomEndPoints} from '../endpoints'
import {UserData} from '../../localStorage'

export const createRoom = (data)=>{
    console.log("Data",JSON.stringify(data));
    const requestOptions = {
        method:"POST",
        headers:{ "token": UserData.getToken(),'Content-Type': 'application/json',},
        body: JSON.stringify(data)
    }

    return fetch(roomEndPoints.createRoom, requestOptions);

}

export const checkRoom = (data)=>{
    const requestOptions = {
        method:"GET",
        headers:{"room":data.room,"password":data.password,'Content-Type': 'application/json',},
    }

    return fetch(roomEndPoints.checkRoom, requestOptions);
}