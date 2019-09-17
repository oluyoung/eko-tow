const jwt = require('jsonwebtoken');

const {
    TOKEN_ISSUER,
    TOKEN_EXPIRES_IN,
    LOGIN_TOKEN_SECRET,
} = process.env;

const TOKEN_TYPES = {
    LOGIN: 'LOGIN',
}

const SECRETS = {
    [TOKEN_TYPES.LOGIN]: LOGIN_TOKEN_SECRET,
}

const verify = ({ token, issuer, expiry, subject, secret }) => {
  const options = {};
  if (issuer) options.issuer = issuer;
  if (expiry) options.expiresIn = expiry;
  if (subject) options.subject = subject;
  return jwt.verify(token, secret, options);
};

const generate = ({ data = {}, issuer, expiry, subject, secret }) => {
  const options = {};
  if (issuer) options.issuer = issuer;
  if (expiry) options.expiresIn = expiry;
  if (subject) options.subject = subject;

  return jwt.sign({ ...data, iat: Math.floor(Date.now() / 1000) }, secret, options);
};

const generateToken = (data = {}, tokenType) => {
  switch(tokenType) {
    default:
      return {
        token: generate({
          data,
          expiry: TOKEN_EXPIRES_IN,
          issuer: TOKEN_ISSUER,
          secret: 'config_secret',
          subject: TOKEN_TYPES.LOGIN,
        }),
        expiresIn: TOKEN_EXPIRES_IN
      };
  }
}

const verifyToken = (token, tokenType) => {
  switch(tokenType) {
    default:
      return verify({
        expiry: TOKEN_EXPIRES_IN,
        issuer: TOKEN_ISSUER,
        secret: 'config_secret',
        subject: TOKEN_TYPES.LOGIN,
        token
      });
  }
}

module.exports = {
  generateToken,
  TOKEN_TYPES,
  verifyToken
};
