const commandLineArgs = require('command-line-args');
const argsValidator = require('./arguments-validator');
const SDES = require('./SDES/sdes');
const DES = require('./DES/des');

const DEFAULT_KEY = '1010000010';
const DES_DEAFULT_KEY = '0001001100110100010101110111100110011011101111001101111111110001'
const options = commandLineArgs(argsValidator.arguments);

let a = DES.encrypt('0000000100100011010001010110011110001001101010111100110111101111', DES_DEAFULT_KEY);
console.log(parseInt(a, 2).toString(16).toUpperCase());
/*
if (argsValidator.validate(options)) {
    if (options.enc) {
        SDES.encryptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
    } else if (options.dec) {
        SDES.decyptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
    }
}*/