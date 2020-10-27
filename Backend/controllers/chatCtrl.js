const Chat = require('../database/schema/chat');

const getChats = (req,res)=>{
    const room = req.headers.room;

    Chat.find({room:room})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            chats:docs
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    })
}


module.exports = {getChats};