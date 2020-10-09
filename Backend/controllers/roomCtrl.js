const { Schema } = require('mongoose');
const Room = require('../database/schema/room');
const mongoose = require('mongoose');

const createRoom = async (req,res)=>{
    const id = req.user.id;
    const fields = [];

    req.body.fields.map((item,index)=>{
        fields.push(JSON.stringify(item));
    })

    const body = req.body;

    const room = new Room({
        title:body.title,
        interviewer:id,
        fields:body.fields,
    }) 

    room.save()
    .then((data)=>{
        return res.status(200).json({
            success:true,
            room:data
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:true,
            msg:"Internal Server Error!"
        })
    })    
}



module.exports = {createRoom};