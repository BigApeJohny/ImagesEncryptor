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
async function encryptImgWithOffset(img, key, extension, offset) {
    console.log('Starting ', img, ' encryption...');
    const outputImg = 'sdes-encrypted.' + extension;
    let arrayBuffer = await imageManager.getImageData(img);
    let newData = arrayBuffer.map((p, i) => {
        if (i < offset) {
            return p;
        } else {
            const data = keyFunctions.toBitSize(p.toString(2));
            return parseInt(encryption(data, key), 2);
        }
    });
    imageManager.createImage(newData, outputImg);
    console.log('Encryption ended. Image saved as ' + outputImg);
}
async function decryptImgWithOffset(img, key, extension, offset) {
    console.log('Starting ', img, ' decryption...');
    const outputImg = 'sdes-decrypted.' + extension;
    let arrayBuffer = await imageManager.getImageData(img);
    let newData = arrayBuffer.map((p, i) => {
        if (i < offset) {
            return p;
        } else {
            const data = keyFunctions.toBitSize(p.toString(2));
            return parseInt(decryption(data, key), 2);
        }
    });
    imageManager.createImage(newData, outputImg);
    console.log('Decryption ended. Image saved as ' + outputImg);
}
async function encryptImage(imgName, key) {
    const extension = imageManager.getImgExtension(imgName);
    if (extension == 'bmp') {
        encryptImgWithOffset(imgName, key, extension, 54);
    } else if (extension == 'ppm') {
        encryptImgWithOffset(imgName, key, extension, 51);
    } else if (extension == 'tga') {
        encryptImgWithOffset(imgName, key, extension, 18);
    } else {
        console.log('Unsupported image extension.', extension);
    } 
}
async function decyptImage(imgName, key) {
    const extension = imageManager.getImgExtension(imgName);
    if (extension == 'bmp') {
        decryptImgWithOffset(imgName, key, extension, 54);
    } else if (extension == 'ppm') {
        decryptImgWithOffset(imgName, key, extension, 51);
    } else if (extension == 'tga') {
        decryptImgWithOffset(imgName, key, extension, 18);
    } else {
        console.log('Unsupported image extension.', extension);
    }  
}

module.exports.encryptImage = encryptImage;
module.exports.decyptImage = decyptImage;