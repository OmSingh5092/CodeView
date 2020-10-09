const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidate = new Schema(
    {
        
    },
    {
        collection:"candidates"
    }
)

module.exports = mongoose.model("candidates",candidate);