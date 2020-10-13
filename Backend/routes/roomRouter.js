const express = require('express');
const router = express.Router();

const roomCtrl = require('../controllers/roomCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

//router.get('/interviewer/own',verifyUser,profileCtrl.getProfile);
router.post('/create',verifyUser,roomCtrl.createRoom);
router.get('/get',roomCtrl.getRoom);
router.get('/check',roomCtrl.checkRoom);
router.get('/check/interviewer',verifyUser,roomCtrl.checkInterviewer);

module.exports = router;