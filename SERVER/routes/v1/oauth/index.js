const express = require('express');
const oauth = express.Router();

const OauthController = require('../../../controllers/oauth.controller').controller;
const OauthControllerObj = new OauthController();

oauth.post('/', OauthControllerObj.oauth);

module.exports = oauth;
