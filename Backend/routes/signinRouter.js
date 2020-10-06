const express = require('express');
const router = express.Router();

const signInCtrl = require('../controllers/signInCtrl');

router.post('/interviewer/google',signInCtrl.googleSignIn);
router.post('/interviewer/email',signInCtrl.emailSignIn);

module.exports = router;