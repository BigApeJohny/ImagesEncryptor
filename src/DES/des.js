const keyGen = require('./key-gen');
const desData = require('./des-data');
const keyFunctions = require('./key-functions');
const permutations = desData.permutations;

function roundFunction(right, subkey) {
    const EP = keyFunctions.expand(right);
    const xor = keyFunctions.xor(EP, subkey);
    const sixBitsArray = keyFunctions.divieToSixbits(xor);
    let sBoxValue = '';
    sixBitsArray.forEach((six, i) => {
        const row = parseInt(six[0] + six[5], 2);
        const col = parseInt(six[1] + six[2] + six[3] + six[4], 2);
        sBoxValue += keyFunctions.toBitSize((desData.sBoxes[i][row][col]).toString(2), 4);
    });
    return keyFunctions.permuteKey(sBoxValue, permutations.P);
}
function round(halves, subkey) {
    const roundFnResult = roundFunction(halves.r, subkey);
    const xor = keyFunctions.xor(halves.l, roundFnResult);
    return halves.r + xor;
}
function decrypt(data, key) {
    const keys = keyGen.generate(key);
    const IP = keyFunctions.permuteKey(data, permutations.IP);
    let previousKey = IP;
    for (let i = 15; i >= 0; i--) {
        previousKey = round(keyFunctions.divideKey(previousKey), keys.subkeys[i]);
    }
    previousKey = keyFunctions.crossKeys(previousKey);
    return keyFunctions.permuteKey(previousKey, permutations.invertedIP);
}
function encrypt(data, key) {
    const keys = keyGen.generate(key);
    const IP = keyFunctions.permuteKey(data, permutations.IP);
    let previousKey = IP;
    for (let i = 0; i < 16; i++) {
        previousKey = round(keyFunctions.divideKey(previousKey), keys.subkeys[i]);
    }
    previousKey = keyFunctions.crossKeys(previousKey);
    return keyFunctions.permuteKey(previousKey, permutations.invertedIP);
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;