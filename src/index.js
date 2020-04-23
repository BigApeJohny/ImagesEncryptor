const commandLineArgs = require('command-line-args');
const argsValidator = require('./arguments-validator');
const SDES = require('./SDES/sdes');

const DEFAULT_KEY = '1010000010';
const options = commandLineArgs(argsValidator.arguments);

if (argsValidator.validate(options)) {
    if (options.enc) {
        SDES.encryptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
    } else if (options.dec) {
        SDES.decyptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
    }
}