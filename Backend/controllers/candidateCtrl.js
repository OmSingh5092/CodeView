const Candidate = require('../database/schema/candidate');

const getCandidate = (req,res)=>{
    console.log("Request",req.headers);
    const id = req.headers.candidate;

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

const createCandidate  = (req,res)=>{
    const body = req.body;
    const candidate = new Candidate({details:body});
    candidate.save().then((doc)=>{
        return res.status(200).json({
            success:true,
            candidate:doc
        })
    }).catch((err)=>{
        console.log("Error", err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server error",
        })
    })
}

const updateCandidate = (req,res)=>{
    const id = req.headers.candidate;
    const body = req.body;

    Candidate.updateOne({_id:id},body)
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            candidate:doc,
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Update unsuccessfull!",
        })
    })
}

module.exports = {getCandidate,createCandidate,updateCandidate};
