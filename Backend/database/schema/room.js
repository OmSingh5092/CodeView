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
            type:Array,
        }, 
        password:{
            type:String,
        } ,
        interviewers:{
            type:Array,
        },
    },{
        timestamps:true
    },
    {
        collection:"rooms"
    }
)

module.exports = mongoose.model("room",room);