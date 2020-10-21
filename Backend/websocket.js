const room = require('./database/schema/room');
const Room  = require('./database/schema/room');

const codeWebSocket= (socket,io)=>{
    socket.on("code",(data)=>{
        console.log("Data",data);
        const {code,room} = data;
        Room.updateOne({_id:room},{code:code})
        .then((doc)=>{
            io.emit(room+"/updateCode",code);
        })
    })
}

const joinRoomRequestSocket = (socket,io)=>{
    socket.on("request",(data)=>{
        const {room,candidate,waiting} = data; 
        console.log("Room",data);
        io.emit("wait/"+room, data);        
    })
}

const acceptRoomRequestSocket = (socket,io)=>{
    socket.on("accept",(data)=>{
        const {room,candidate,res} = data;
        console.log("Accept",data);
        //Res == boolean value
        io.emit("waitResponse/"+room,res);
    })
}

module.exports = {codeWebSocket,joinRoomRequestSocket,acceptRoomRequestSocket};