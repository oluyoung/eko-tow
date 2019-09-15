const express = require('express');
const v1 = express.Router();

v1.use('/users', require('./users'))
v1.use('/driversLocations', require('./driversLocations'))
v1.use('/tows', require('./tows'))
v1.use('/users', require('./users'))

module.exports = v1;
