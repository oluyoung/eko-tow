const Error = require('../utils/errors').Errors;
const errorObj = new Error();

const oauthHelperObj = require('../helpers/oauth.helper');


const verifyAuth = () => {
    return (req, res, next) => {
        const authorization = req.get('Authorization');
    
        if (authorization) {
            if (authorization.startsWith('Bearer')) {
                try {
                    let token = authorization.split('Bearer')[1];
                    token = token.trim();
        
                    req.decode = oauthHelperObj.verifyToken(token);
        
                    next();
                } catch(e) {
                    console.log(e);
                    next(errorObj.Unauthorized());
                }
            } else {
                next(errorObj.Unauthorized());
            }
        } else {
            next(errorObj.Unauthorized());
        }
    }
}

module.exports = verifyAuth