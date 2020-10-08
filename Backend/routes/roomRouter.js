const express = require('express');
const router = express.Router();

const roomCtrl = require('../controllers/roomCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

//router.get('/interviewer/own',verifyUser,profileCtrl.getProfile);
router.post('/create',verifyUser,roomCtrl.createRoom);

module.exports = router;