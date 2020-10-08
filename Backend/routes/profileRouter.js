const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profileCtrl')
const verifyUser = require('../middlewares/verifyMW').user;

router.get('/interviewer/own',verifyUser,profileCtrl.getProfile);
router.post('/interviewer/update',verifyUser,profileCtrl.updateProfile);

module.exports = router;