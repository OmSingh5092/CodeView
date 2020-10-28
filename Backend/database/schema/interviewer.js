const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interviewer = new Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
        phone:{
            type:Number
        },
        company:{
            type:String
        },
        website:{
            type:String,
        },
        photo:{
            type:String,
        },
    },{
        timestamps:true
    },
    {
        collection:"interviewers"
    }
)

module.exports = mongoose.model("interviewer",interviewer);