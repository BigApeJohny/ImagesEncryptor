const keyGen = require('./key-gen');
const desData = require('./des-data');
const keyFunctions = require('./key-functions');
const imageManager = require('./../image-loader');
const hexToBinary = require('hex-to-binary');
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
async function decryptBMP(img, key) {
    console.log('Starting ', img, ' decryption...');
    const outputImg = 'des-decrypted.bmp';
    let arrayBuffer = await imageManager.getImageData(img);
    let temp = [];
    let a = '';
    arrayBuffer.forEach((p, i) => {
        if ( i >= 54) {
            a += keyFunctions.toBitSize(p.toString(2));
            if (a.length === 64) {
                temp.push(decrypt(a, key));
                a = '';
            }
            if (i == (arrayBuffer.length -1) && a.length !== 64) {
                a = keyFunctions.toBitSize(a, 64);
                temp.push(decrypt(a, key));
            }
        }
    });
    let newTemp = [];
    temp.forEach(t => {
        for (let i = 0; i < 8; i++) {
            newTemp.push(t.slice(i * 8, i * 8 + 8));
        }
    });
    let newData = arrayBuffer.map((p, i) => {
        if (i < 54) {
            return p;
        } else {
            return parseInt(newTemp[i - 54], 2);
        }
    });
    imageManager.createImage(newData, outputImg);
    console.log('Decrypted ended. Image saved as ' + outputImg);
}
async function encryptBMP(img, key) {
    console.log('Starting ', img, ' encryption...');
    const outputImg = 'des-encrypted.bmp';
    let arrayBuffer = await imageManager.getImageData(img);
    let temp = [];
    let a = '';
    arrayBuffer.forEach((p, i) => {
        if ( i >= 54) {
            a += keyFunctions.toBitSize(p.toString(2));
            if (a.length === 64) {
                temp.push(encrypt(a, key));
                a = '';
            }
            if (i == (arrayBuffer.length -1) && a.length !== 64) {
                a = keyFunctions.toBitSize(a, 64);
                temp.push(encrypt(a, key));
                a = '';
            }
        }
    });
    let newTemp = [];
    temp.forEach(t => {
        for (let i = 0; i < 8; i++) {
            parseInt(newTemp.push(t.slice(i * 8, i * 8 + 8)), 2);
        }
    });
    let newData = arrayBuffer.map((p, i) => {
        if (i < 54) {
            return p;
        } else {
            return parseInt(newTemp[i - 54], 2);
        }
    });
    imageManager.createImage(newData, outputImg);
    console.log('Encryption ended. Image saved as ' + outputImg);
}
function encyrptImage(img, key){
    key = keyFunctions.toBitSize(hexToBinary(key), 64);
    let extension = imageManager.getImgExtension(img);
    if (extension == 'bmp') {
        encryptBMP(img, key);
    } else {
        console.log('Unsupported image extension.', extension);
    }   
}
function decryptImage(img, key){
    key = keyFunctions.toBitSize(hexToBinary(key), 64);
    let extension = imageManager.getImgExtension(img);
    if (extension == 'bmp') {
        decryptBMP(img, key);
    } else {
        console.log('Unsupported image extension.', extension);
    }   
}

module.exports.encyrptImage = encyrptImage;
module.exports.decryptImage = decryptImage;