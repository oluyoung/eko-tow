const express = require('express');
const v1 = express.Router();

v1.use('/users', require('./users'))
v1.use('/driversLocations', require('./driversLocations'))
v1.use('/towBookings', require('./towBookings'))
v1.use('/drivers', require('./drivers'))

module.exports = v1;
