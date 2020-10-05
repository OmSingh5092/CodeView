const Interviewer = require('../database/schema/interviewer');

const getProfile = async (req,res)=>{
    const id = req.user.id;

    try{
        const profile = await Interviewer.findOne({id:id});

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

module.exports = {getProfile};