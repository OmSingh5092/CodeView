const express = require('express');
const router = express.Router();

const chatCtrl = require('../controllers/chatCtrl');

router.get('/chats/room',chatCtrl.getChats);

module.exports = router;