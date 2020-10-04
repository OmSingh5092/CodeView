const config = {
    app:{
        local:{
            port: 8000,
        }
    },
    session:{
        // It holds the secret key for session 
        secret: 'Your_Secret_Key',
        // Forces the session to be saved 
        // back to the session store 
        resave: true, 
        // Forces a session that is "uninitialized" 
        // to be saved to the store 
        saveUninitialized: true
    },
    jwt:{
        TOKEN_SECRET:"OmSingh"
    },
    database:{
        local:{
            uri:"mongodb://localhost:27017/CodeView"
        },
        prod:{
            
        }
    },
    gcp:{
        clientId: "541374752269-86ein6vehn2elteuea39arj5nnaok92o.apps.googleusercontent.com",
        clientSecret:"iKd6K67CdlmgVEvKHSclJ9Mf"
    },
}

module.exports = config;