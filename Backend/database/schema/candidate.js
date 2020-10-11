const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidate = new Schema(
    {
        details:Object
    },{
        timestamps:true
    },
    {
        collection:"candidates"
    }
)

module.exports = mongoose.model("candidates",candidate);