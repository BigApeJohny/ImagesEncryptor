const keyGen = require('./key-gen');

function encrypt(data, key) {
    const keys = keyGen.generate(key);
}

module.exports.encrypt = encrypt;