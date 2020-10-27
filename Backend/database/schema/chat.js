const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chat = new Schema(
    {
        room:{
            type:String,
        },
        message:{
            type:String,
        },
        media:{
            type:String,
        },
        isCandidate:{
            type:Boolean,
        },
        //Sender Id
        sender:{
            type:String,
        }

    },{
        timestamps:true
    },
    {
        collection:"chats"
    }
)

module.exports = mongoose.model("chat",chat);