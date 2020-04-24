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
    let result = '';
    for (let i = 0; i < key1.length; i++) {
        result += (key1[i] != key[i]) ? '1' : '0';
    }
    return result;
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
function divieToSixbits(key) {
    let result = [];
    let sixBits = '';
    for (let i = 0; i < key.length; i++) {
        sixBits += key[i];
        if (sixBits.length === 6) {
            result.push(sixBits);
            sixBits = '';
        }
    }
    return result;
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
module.exports.divieToSixbits = divieToSixbits;