const { OAuth2Client } = require('google-auth-library');
const   jwt = require('jsonwebtoken');
const config = require('../config');

const Interviewer = require('../database/schema/interviewer');
const googleSignIn= async (req,res)=>{
    const idToken = req.body.idToken;
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

    const payload = ticket.getPayload();
    const userEmail = payload['email'];
    const userName = payload['name'];

    const authData = {
        email: userEmail,
        name: userName,
    }

    try{
        const document = await Interviewer.findOne({email:userEmail});
        console.log("User Exists")
        authData.id = document.id;
        const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
        return res.status(200).json({
            success:true,
            newUser:false,
            jwt:token
        })
    }
    catch(err){
        console.log("error",err);
        console.log("User doesnot exists");
        const interviewer = new Interviewer({
            name:userName,
            email:userEmail,
        })
        interviewer.save()
        .then((data)=>{
            authData.id = data.id;
            const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
            return res.status(200).json({
                success:true,
                newUser:true,
                jwt: token
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

const emailSignIn = (req,res)=>{

}



module.exports = {googleSignIn,emailSignIn};