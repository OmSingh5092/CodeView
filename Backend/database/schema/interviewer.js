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
    },
    {
        collection:"interviewers"
    }
)

module.exports = mongoose.model("interviewer",interviewer);