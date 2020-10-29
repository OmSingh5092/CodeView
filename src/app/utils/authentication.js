const googleLogin = (response)=>{
    var profile = response.profileObj
    signInWithGoogle(response).then((res)=>(res.json()))
    .then((data)=>{
        console.log("login successfull");
        //Saving data in 
        //Getting Success.
        if(data.success){
            UserData.setIdToken(data.authToken);
            //setting email
            UserData.setEmail(profile.email);
            if(data.newUser){
                this.props.history.push('/register');
            }else{
                getProfile().then((res)=>(res.json()))
                .then((res)=>{
                    if(res.success){
                        UserData.setUserData(res.profile);
                        this.props.history.push('/homepage');
                    }else{
                        console.log(res.msg);
                    }
                    
                })
                
            }
            
        }else{
            console.log(data.msg);
        }
    })
}

export {googleLogin}