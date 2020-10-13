const Room  = require('./database/schema/room');

const codeWebSocket= (socket,io)=>{
    socket.on("code",(data)=>{
        console.log("Data",data);
        const {code,room} = data;
        Room.updateOne({_id:room},{code:code})
        .then((doc)=>{
            io.emit("updateCode",code);
        })
        

    })
}

module.exports = {codeWebSocket};