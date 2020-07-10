const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');
const authMiddleware = require('../../middlewares/auth');

router.post('/user/signUp', controller.signUp);
router.post('/user/signIn', controller.signIn);

module.exports = router;