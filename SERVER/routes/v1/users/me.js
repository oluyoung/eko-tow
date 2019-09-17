const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/users.controller').controller;
const userControllerObj = new userController();

router.get('/', userControllerObj.getMe);
router.put('/', userControllerObj.updateMe);

module.exports = router;
