const { Schema } = require('mongoose');
const Room = require('../database/schema/room');
const mongoose = require('mongoose');

const createRoom = async (req,res)=>{
    const id = req.user.id;
    const body = req.body;

    const room = new Room({
        title:body.title,
        interviewers:[id],
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

const checkInterviewer = async (req,res)=>{
    const id = req.user.id;
    const headers = req.headers;

    const roomId = headers.room_id;
    console.log("Id",id);
    console.log("Details",roomId);
    try{
        const room = await Room.findById(roomId);

        if(room){
            var exists  = false;
            if(room.interviewers.includes(id)){
                exists = true;
            }else{
                exists = false;
            }

            return res.status(200).json({
                success:true,
                exists:exists
            })
        }else{
            return res.status(200).json({
                success:true,
                exists:false,
            })
        }
    }catch(err){
        return res.status(500).json({
            success:false,
            msg:"Please check the room id",
        })
    }
    
    
}

module.exports = {createRoom,checkRoom,joinRoom,checkInterviewer};