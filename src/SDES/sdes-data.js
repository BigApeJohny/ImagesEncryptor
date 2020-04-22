const keyIP = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const IP = [2, 6, 3, 1, 4, 8, 5, 7];
const invertedIP = [4, 1, 3, 5, 7, 2, 8, 6];
const P8 = [6, 3, 7, 4, 8, 5, 10, 9];
const P4 = [2, 4, 3, 1];
const EP = [4, 1, 2, 3, 2, 3, 4, 1];
const S0 = [
    ['01', '00', '11', '10'],
    ['11', '10', '01', '00'],
    ['00', '10', '01', '11'],
    ['11', '01', '11', '10'],
];
const S1 = [
    ['00', '01', '10', '11'],
    ['10', '00', '01', '11'],
    ['11', '00', '01', '00'],
    ['10', '01', '00', '11'],
];
const permutations = {
    keyIP: keyIP,
    IP: IP,
    invertedIP: invertedIP,
    P8: P8,
    P4: P4,
    EP: EP,
}
const substitutionBoxes = {
    S0: S0,
    S1: S1
}

module.exports.permutations = permutations;
module.exports.substitutionBoxes = substitutionBoxes;