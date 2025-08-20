const { createChat } = require('../controllers/chatController');
const { authUser } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post("/", authUser, createChat)

module.exports = router;