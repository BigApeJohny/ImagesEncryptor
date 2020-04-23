const sdesData = require('./des-data');
const permutations = sdesData.permutations;

function divideKey(key) {
    let left = '';
    let right = '';
    for (let i = 0; i < key.length; i++) {
        if (i < (key.length / 2)) {
            left += key[i];
        } else {
            right += key[i];
        }
    }
    return {
        l: left,
        r: right
    };
}
function connectHalfes(hafles) {
    return hafles.l + hafles.r;
}
function permuteKey(key, pattern) {
    let value = '';
    for (let i = 0; i < pattern.length; i++) {
        value += key[(pattern[i]) - 1];
    }
    return value;
}
function leftShift(key, places) {
    let shift = key.split('');
    for (let i = 0; i < places; i++) {
        shift.push(shift.shift());
    }
    return shift.join('',',');
}
function xor(key1, key) {
    let kLength = key.length;
    let result = '';
    let xor = (parseInt(key1, 2) ^ parseInt(key, 2)).toString(2);
    for (let i = 0; i < (kLength - xor.length); i++) {
        result += '0';
    }
    return result + xor;
}
function expand(key) {
    return permuteKey(key, permutations.EP);
}
function subtitutionBox(key, box) {
    const row = parseInt((key[0].toString() + key[3].toString()), 2);
    const col = parseInt((key[1].toString() + key[2].toString()), 2);
    return box[row][col];
}
function crossKeys(key) {
    const halves = divideKey(key);
    return halves.r + halves.l;
}
function toBitSize(key, size = 8) {
    const a = size - key.length;
    let result = '';
    for (let i = 0; i < a; i++) {
        result += '0';
    }
    return result + key;
}

module.exports.divideKey = divideKey;
module.exports.connectHalfes = connectHalfes;
module.exports.permuteKey = permuteKey;
module.exports.leftShift = leftShift;
module.exports.xor = xor;
module.exports.expand = expand;
module.exports.subtitutionBox = subtitutionBox;
module.exports.crossKeys = crossKeys;
module.exports.toBitSize = toBitSize;