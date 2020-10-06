const express = require('express');
const app = express();
const config = require('./config');
const database = require('./database/database');
const session = require('express-session');
const cors = require('cors');

require('./passport');

//Applying middlewares
app.use(express.json());
app.use(session(config.session));
app.use(cors());

//Importing rotues
const signInRoute = require('./routes/signinRouter');
const profileRoute =require('./routes/profileRouter');

//Applying routes
app.use('/api/signin',signInRoute);
app.use('/api/profile',profileRoute);

app.listen(config.app.local.port, ()=>{
    console.log("\n\n App listening... \n\n");
})