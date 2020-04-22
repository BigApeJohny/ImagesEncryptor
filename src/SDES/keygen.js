const sdesData = require('./sdes-data');
const keyFunctions = require('./key-functions');
const permutations = sdesData.permutations;

function generate(key) {
    // ROUND 1
    let P10 = keyFunctions.permuteKey(key, permutations.keyIP);
    let P10halfes = keyFunctions.divideKey(P10);
    let shiftedHalfes = {
        l: keyFunctions.leftShift(P10halfes.l, 1),
        r: keyFunctions.leftShift(P10halfes.r, 1),
    };
    shiftedP10 = keyFunctions.connectHalfes(shiftedHalfes);
    let K1 = keyFunctions.permuteKey(shiftedP10, permutations.P8);

    // ROUND 2
    let secondShifthalfes = {
        l: keyFunctions.leftShift(shiftedHalfes.l, 2),
        r: keyFunctions.leftShift(shiftedHalfes.r, 2)
    }
    secondConnectedHalfes = keyFunctions.connectHalfes(secondShifthalfes);
    let K2 = keyFunctions.permuteKey(secondConnectedHalfes, permutations.P8);

    return {
        key: key,
        subkeys: [K1, K2]
    };
}

module.exports.generate = generate;