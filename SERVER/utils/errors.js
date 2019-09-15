const createError = require('http-errors');

function Errors() {}


Errors.prototype.Conflict = function(message, options) {
    return createObj(new createError.Conflict(message), options)
}

Errors.prototype.InternalServerError = function(message, options) {
    return createObj(new createError.InternalServerError(message), options)
}

Errors.prototype.NotFound = function(message, options) {
    return createObj(new createError.NotFound(message), options)
}

Errors.prototype.Unauthorized = function(message, options) {
    return createObj(new createError.Unauthorized(message), options)
}

Errors.prototype.UnprocessableEntity = function(message, options) {
    return createObj(new createError.UnprocessableEntity(message), options)
}


/**
 * HELPERS
 */

 const createObj = function( error, { expose = true, ...rest } = {} ) {
    return {
        error,
        options: {
            expose,
            ...rest
        }
    }
 }

module.exports = { Errors };