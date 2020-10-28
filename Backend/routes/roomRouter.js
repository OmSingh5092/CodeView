const express = require('express');
const router = express.Router();

const roomCtrl = require('../controllers/roomCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

//router.get('/interviewer/own',verifyUser,profileCtrl.getProfile);
router.post('/create',verifyUser,roomCtrl.createRoom);
router.post('/add/interviewer',verifyUser,roomCtrl.addInterviewer);
router.post('/remove/interviewer',verifyUser,roomCtrl.removeInterviewer);
router.get('/get',roomCtrl.getRoom);
router.get('/check',roomCtrl.checkRoom);
router.get('/check/interviewer',verifyUser,roomCtrl.checkInterviewer);
router.get('/get/interviewer',verifyUser,roomCtrl.getRoomsByInterviewer);

module.exports = router;