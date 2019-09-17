const { verifyPassword } = require('./utils');

const verifyPasswordAsync = async function(password) {
  return await verifyPassword(password, this.password);
}

module.exports = {
  verifyPasswordAsync
};
