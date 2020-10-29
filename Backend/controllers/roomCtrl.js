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

const getRoom = async (req,res)=>{
    const id = req.headers.id;
    try{
        const room = await Room.findById(id);
        if(room){
            return res.status(200).json({
                success:true,
                room:room,
            })
        }else{
            return res.status(200).json({
                success:false,
                msg:"Room Doesnot Exists!",
            })
        }
        
    }catch(err){
        res.status(500).json({
            success:false,
            msg:"Room Doesnot exists!"
        })
    }
    
}



const checkInterviewer = async (req,res)=>{
    const id = req.user.id;
    const headers = req.headers;

    const roomId = headers.room_id;
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
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Please check the room id",
        })
    }
}

const addInterviewer = (req,res)=>{
    const id = req.user.id;
    const room = req.headers.room;
    
    Room.updateOne({_id:room},{$push:{interviewers:id}})
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            msg:"Update Successfull",
        })
    }).catch((err)=>{
        console.log("Error",err);
    })
}

const removeInterviewer = async (req,res)=>{
    const id = req.user.id;
    const room = req.headers.room;

    try{
        const update = await Room.updateOne({_id:room},{$pull:{interviewers:id}});
        const doc = await Room.findOne({_id:room});

        //Deleting the document if no 
        if(doc.interviewers.length == 0){
            await Room.deleteOne({_id:room});
        }

        return res.status(200).json({
            success:true,
            msg:"Update Successfull",
        })
    }catch(err){
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Update unsuccessfull",
        })
    }

    

    
}

const getRoomsByInterviewer = (req,res)=>{
    const id = req.user.id;
    
    Room.find({interviewers:{$all:[id]}})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            rooms:docs
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

module.exports = {createRoom,checkRoom,getRoom,checkInterviewer,removeInterviewer,addInterviewer,getRoomsByInterviewer};