const Room  = require('./database/schema/room');
const Chat = require('./database/schema/chat');
const Interviewer = require('./database/schema/interviewer');

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

const chatRequestSocket = (socket,io)=>{
    socket.on("chat_receive",(data)=>{
        
        const chat = new Chat(data);
        chat.save().then((doc)=>{
            io.emit("chat_send/"+data.room,doc);
        })

    })
}

const interviewerRoomRequestSocket = (socket,io)=>{
    socket.on("request_interviewer",(data)=>{
        const {room,email} = data;

        Interviewer.findOne({email:email})
        .then((doc)=>{
            console.log("Interviewer",doc);
            if(doc){
                io.emit("interviewer_wait/"+doc._id,data);
            }else{
                io.emit("interviewer_wait_response/"+room,{res:false, msg:"Email not valid!"});
            }
        })

        
    })
}

const interviewerAcceptRoomRequest = (socket,io)=>{
    socket.on("interviewer_accept",(data)=>{
        const {room,res,interviewer} = data;

        if(!res){
            data["msg"] = "Interviewer rejected the request!"
        }
        //Emitting the request response.
        io.emit("interviewer_wait_response/"+room,data);

        
    })
}

module.exports = {codeWebSocket,joinRoomRequestSocket,acceptRoomRequestSocket,chatRequestSocket,interviewerRoomRequestSocket,interviewerAcceptRoomRequest};