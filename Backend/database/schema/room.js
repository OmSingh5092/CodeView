const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const room= new Schema(
    {
        title:{
            type:String
        },
        fields:{
            type:Object,
        },
        candidate:{
            type: Schema.Types.ObjectId,
             ref: 'candidates'
        },
        interviewer:{
            type: Schema.Types.ObjectId,
            ref: 'interviewers'
        },
    },{
        timestamps:true
    },
    {
        collection:"rooms"
    }
)

module.exports = mongoose.model("room",room);