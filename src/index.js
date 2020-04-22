const commandLineArgs = require('command-line-args');
const argsValidator = require('./arguments-validator');
const SDES = require('./SDES/sdes');

const DEFAULT_KEY = '1010000010';
const args = [
    { name: 'mode', alias: 'm', type: String },
    { name: 'key', alias: 'k', type: String },
    { name: 'img', alias: 'i', type: String },
];

const options = commandLineArgs(args)

if (argsValidator.validate(options)) {
    switch(options.mode) {
        case 'enc': 
            SDES.encryptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
            break;
        case 'dec': 
            SDES.decyptImage(options.img, (options.key !== undefined) ? options.key : DEFAULT_KEY);
            break;
    }
}