const Candidate = require('../database/schema/candidate');

const getCandidate = (req,res)=>{
    const id = req.body.id;

    Candidate.findById(id)
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            candidate:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    })

}

module.exports = {getCandidate};
