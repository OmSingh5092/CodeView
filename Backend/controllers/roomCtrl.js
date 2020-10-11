const { Schema } = require('mongoose');
const Room = require('../database/schema/room');
const mongoose = require('mongoose');

const createRoom = async (req,res)=>{
    const id = req.user.id;
    const body = req.body;

    const room = new Room({
        title:body.title,
        interviewer:id,
        password:body.password,
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

const checkRoom = (req,res)=>{
    const header = req.headers;
    console.log("Header",header);
    const room =header.room;
    const password = header.password;
    Room.findById(room).then((doc)=>{
        console.log("Doc", doc);
        return res.status(200).json({
            success:true,
            verified:(doc.password == password)
        })
    }).catch((err)=>{
        console.log("Error",err);
        res.status(500).json({
            success:false,
            msg:"Room Doesnot Exists",
        })
    })
}

const joinRoom  = (req,res)=>{
    

}

module.exports = {createRoom,checkRoom,joinRoom};