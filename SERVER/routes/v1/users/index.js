const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/users.controller').controller;
const userControllerObj = new userController();

const { verifyAuth } = require('../../../middlewares');

router.post('/', userControllerObj.createUser);
router.get('/', userControllerObj.loginUser);
// router.use(verifyAuth());
router.use('/me', require('./me'));

module.exports = router;
