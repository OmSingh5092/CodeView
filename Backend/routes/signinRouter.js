const express = require('express');
const router = express.Router();

const signInCtrl = require('../controllers/signInCtrl');

router.post('/interviewer',signInCtrl.createUser);


module.exports = router;