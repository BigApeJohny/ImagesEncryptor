const commandLineArgs = require('command-line-args');
const argsValidator = require('./arguments-validator');
const SDES = require('./SDES/sdes');
const DES = require('./DES/des');

const DEFAULT_KEY = '1010000010';
const DES_DEAFULT_KEY = '133457799BBCE000';
const options = commandLineArgs(argsValidator.arguments);
if (argsValidator.validate(options)) {
    if (options.sdes) {
        if (options.enc) {
            SDES.encryptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
        } else if (options.dec) {
            SDES.decyptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
        }
    }
    if (options.des) {
        if (options.enc) {
            DES.encyrptImage(options.img, (options.key !== undefined) ? options.key : DES_DEAFULT_KEY);
        } else if (options.dec) {
            DES.decryptImage(options.img, (options.key !== undefined) ? options.key : DES_DEAFULT_KEY);
        }
    }
}