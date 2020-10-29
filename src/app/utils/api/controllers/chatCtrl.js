import {chatEndPoints} from '../endpoints'

export const getChats = (roomId)=>{
    const requestOptions = {
        method:"GET",
        headers:{ "room":roomId ,'Content-Type': 'application/json',}
    }

    return fetch(chatEndPoints.getChats,requestOptions);
}