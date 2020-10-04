const express = require('express');
const app = express();
const config = require('./config');
const database = require('./database/database');
const session = require('express-session');

//Applying middlewares
app.use(express.json());
app.use(session(config.session));

//Importing rotues
const signInRoute = require('./routes/signinRouter');

//Applying routes
app.use('/api/signin',signInRoute);

app.listen(config.app.local.port, ()=>{
    console.log("\n\n App listening... \n\n");
})