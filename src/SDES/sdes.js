const sdesData = require('./sdes-data');
const keyFunctions = require('./key-functions');
const keyGen = require('./keygen');
const imageManager = require('./../image-loader');

const permutations = sdesData.permutations;
const subtitutionBoxes = sdesData.substitutionBoxes;

function round(plainText, key) {
    let ipHalfes = keyFunctions.divideKey(plainText);
    let ep = keyFunctions.expand(ipHalfes.r);
    let xorK = keyFunctions.xor(key, ep);
    xorKhalfes = keyFunctions.divideKey(xorK);
    xorS0 = keyFunctions.subtitutionBox(xorKhalfes.l, subtitutionBoxes.S0);
    xorS1 = keyFunctions.subtitutionBox(xorKhalfes.r, subtitutionBoxes.S1);
    let xorResult = xorS0 + xorS1;
    let runResult = keyFunctions.xor(keyFunctions.permuteKey(xorResult, permutations.P4), ipHalfes.l) + ipHalfes.r;
    return runResult;
}
function encryption(data, key) {
    const keys = keyGen.generate(key);
    const ip = keyFunctions.permuteKey(data, permutations.IP);
    const firstRound = round(ip, keys.subkeys[0]);
    const crossedKey = keyFunctions.crossKeys(firstRound);
    const secondRound = round(crossedKey, keys.subkeys[1]);
    return keyFunctions.permuteKey(secondRound, permutations.invertedIP);
}
function decryption(data, key) {
    const keys = keyGen.generate(key);
    const ip = keyFunctions.permuteKey(data, permutations.IP);
    const firstRound = round(ip, keys.subkeys[1]);
    const crossedKey = keyFunctions.crossKeys(firstRound);
    const secondRound = round(crossedKey, keys.subkeys[0]);
    return keyFunctions.permuteKey(secondRound, permutations.invertedIP);
}
async function encryptBMP(img, key) {
    console.log('Starting ', img, ' encryption...');
    let arrayBuffer = await imageManager.getImageData(img);
    let newData = arrayBuffer.map((p, i) => {
        if (i < 54) {
            return p;
        } else {
            const data = keyFunctions.toBitSize(p.toString(2));
            return parseInt(encryption(data, key), 2);
        }
    });
    imageManager.createImage(newData, 'encryption.bmp');
    console.log('Encryption ended. Image saved as "encryption.bmp"');
}
async function decryptionBMP(img, key) {
    console.log('Starting ', img, ' decryption...');
    let arrayBuffer = await imageManager.getImageData(img);
    let newData = arrayBuffer.map((p, i) => {
        if (i < 54) {
            return p;
        } else {
            const data = keyFunctions.toBitSize(p.toString(2));
            return parseInt(decryption(data, key), 2);
        }
    });
    imageManager.createImage(newData, 'decryption.bmp');
    console.log('Decryption ended. Image saved as "decryption.bmp"');
}
async function encryptImage(imgName, key) {
    // detect extension
    // returning array buffer

    // BMP
    await encryptBMP(imgName, key);
}
async function decyptImage(imgName, key) {
    // detect extension
    // returning array buffer

    // BMP
    await decryptionBMP(imgName, key);
}

module.exports.encryptImage = encryptImage;
module.exports.decyptImage = decyptImage;