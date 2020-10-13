import socketIOClient from 'socket.io-client'
import {backend} from '../config'

export const socket = socketIOClient(backend.websocketEndPoint);
socket.connect();

socket.on("connection",()=>{
    
})