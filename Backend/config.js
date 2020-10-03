const config = {
    app:{
        local:{
            port: 8000,
        }
    },
    jwt:{
        jwtKey:process.env.JWT_KEY|| "CODEVIEW"
    },
    database:{
        local:{
            DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
            DATABASE_NAME: process.env.DATABASE_NAME || 'codeview',
            DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
            DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'omsingh',
            DATABASE_PORT: process.env.DATABASE_PORT || 5433,
            DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',
            NODE_ENV: process.env.NODE_ENV || 'development',
            SCHEMA: "public",
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