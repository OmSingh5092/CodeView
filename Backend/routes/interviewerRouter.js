const express = require('express');
const router = express.Router();

const interviewerCtrl = require('../controllers/interviewerCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/profile',verifyUser,interviewerCtrl.getProfile);
router.post('/update',verifyUser,interviewerCtrl.updateProfile);

module.exports = router;