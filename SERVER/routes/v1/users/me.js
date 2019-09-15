const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/users.controller').controller;
const userControllerObj = new userController();

router.get('/', userControllerObj.getMe);

module.exports = router;
