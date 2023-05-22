const express = require('express');
const router = express.Router();
const userController = require('../Controller/user.controller')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/refreshToken', userController.refreshToken)
router.post('/logout', userController.logout)

module.exports = router;


