const { OAuth2Client } = require('google-auth-library');

const Interviewer = require('../database/schema/interviewer');
const createUser = async (req,res)=>{
    /*const idToken = req.body.idToken;
    const client = new OAuth2Client(config.gcp.clientId);

    if(idToken == null){
        return res.json({
            success:false,
            message:"Token not found"
        })
    }
    
    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience:config.gcp.clientId,
    });

    const payload = ticket.getPayload();*/
    const userEmail = "OmSingh"//payload['email'];
    const userName = "Name"//payload['name'];

    req.session.user = {
        name:userName,
        email:userEmail,
    }

    try{
        const document = await Interviewer.findOne({email:userEmail});
        console.log("User Exists")
        req.session.user['id'] = document.id;
        return res.status(200).json({
            success:true,
            newUser:false,
        })
    }
    catch(err){
        console.log("error",err);
        console.log("User doesnot exists");
        const interviewer = new Interviewer({
            name:userName,
            email:userEmail
        })
        
        interviewer.save()
        .then((data)=>{
            req.session.user['id'] = data.id;

            return res.status(200).json({
                success:true,
                newUser:true,
            })
        })
        .catch((err)=>{
            console.log(err);
            return res.status(500).json({
                success:false,
                msg:"Internal server error",
            })
        })
    }

    
}

module.exports = {createUser};