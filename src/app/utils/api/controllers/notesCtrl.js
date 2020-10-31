import {notesEndPoints} from '../endpoints'
import {UserData} from '../../localStorage'

export const getNotes = (roomId)=>{
    const requestOptions = {
        method:"GET",
        headers:{ "token":UserData.getToken(),"room":roomId ,'Content-Type': 'application/json',}
    }

    return fetch(notesEndPoints.getNotes,requestOptions);
}

export const updateNotes = (roomId,note)=>{
    const requestOptions = {
        method:"POST",
        headers:{ "token":UserData.getToken(),"room":roomId ,'Content-Type': 'application/json',},
        body:JSON.stringify({note:note}),
    }

    return fetch(notesEndPoints.updateNotes,requestOptions);
}