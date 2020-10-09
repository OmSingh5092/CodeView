const express = require('express');
const router = express.Router();

const candidateCtrl = require('../controllers/candidateCtrl')

router.get('/profile',candidateCtrl.getCandidate);

module.exports = router;