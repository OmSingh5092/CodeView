const express = require('express');
const router = express.Router();

const candidateCtrl = require('../controllers/candidateCtrl')

router.get('/profile',candidateCtrl.getCandidate);
router.post('/create',candidateCtrl.createCandidate);
router.post('/update',candidateCtrl.updateCandidate);

module.exports = router;