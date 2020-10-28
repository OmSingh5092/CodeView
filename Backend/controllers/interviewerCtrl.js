const Interviewer = require('../database/schema/interviewer');

const getProfile = async (req,res)=>{
    const id = req.user.id;

    try{
        const profile = await Interviewer.findOne({_id:id});

        return res.status(200).json({
            success:true,
            profile:profile,
        })
    }catch(err){
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    }
}

const updateProfile = (req,res) =>{
    const id = req.user.id;
    Interviewer.updateOne({_id:id},req.body)
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            update:doc,
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Update not possible",
        })
    })
} 

const getById = (req,res)=>{
    const id = req.headers.id;
    console.log("Interviewer Id",id);
    Interviewer.findOne({_id:id})
    .then((doc)=>{
        console.log("Doc",doc);
        return res.status(200).json({
            success:true,
            interviewer:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    })
}

module.exports = {getProfile,updateProfile,getById};