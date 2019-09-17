const express = require('express');
const api = express.Router();

api.use('/v1', require('./v1'));

// TODO: remove route
api.get('/', (req, res, next) => {
  res.render('index.html');
});

module.exports = api;
