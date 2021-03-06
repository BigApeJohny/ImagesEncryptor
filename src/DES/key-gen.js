const desData = require('./des-data');
const keyFunctions = require('./key-functions');
const permutations = desData.permutations;

function generate(key) {
    const Kplus = keyFunctions.permuteKey(key, permutations.PC1);
    const KplusHalves = keyFunctions.divideKey(Kplus);
    let subkeyhalves = [KplusHalves]
    let subkeys = [];
    for (let i = 0; i < 16; i++) {
        subkeyhalves.push({
            l: keyFunctions.leftShift(subkeyhalves[i].l, desData.leftShifts[i]),
            r: keyFunctions.leftShift(subkeyhalves[i].r, desData.leftShifts[i]),
        })
    }
    for (let i = 0; i < 16; i++) {
        subkeys.push(
            keyFunctions.permuteKey(
                keyFunctions.connectHalfes(subkeyhalves[i + 1]),
                permutations.PC2
            )
        );
    }
    return {
        key: key,
        subkeys: subkeys
    };
}

module.exports.generate = generate;;