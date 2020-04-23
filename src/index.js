const commandLineArgs = require('command-line-args');
const argsValidator = require('./arguments-validator');
const SDES = require('./SDES/sdes');
const DES = require('./DES/des');

const DEFAULT_KEY = '1010000010';
const DES_DEAFULT_KEY = '0001001100110100010101110111100110011011101111001101111111110001'
const options = commandLineArgs(argsValidator.arguments);

DES.encrypt(undefined, DES_DEAFULT_KEY);
/*
if (argsValidator.validate(options)) {
    if (options.enc) {
        SDES.encryptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
    } else if (options.dec) {
        SDES.decyptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
    }
}*/