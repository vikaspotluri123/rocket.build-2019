const {promisify} = require('util');
const bcrypt = require('bcryptjs');

const genSalt = promisify(bcrypt.genSalt);
const genHash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

module.exports.hash = plainText => genSalt().then(salt =>
	genHash(plainText, salt)
);

module.exports.compare = (plainText, hashText) => compare(plainText, hashText);
