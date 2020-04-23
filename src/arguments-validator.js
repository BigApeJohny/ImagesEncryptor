const args = [
    { name: 'enc', alias: 'e', type: Boolean },
    { name: 'dec', alias: 'd', type: Boolean },
    { name: 'key', alias: 'k', type: String },
    { name: 'img', alias: 'i', type: String },
];
function validate(args) {
    if (args['img'] === undefined) {
        console.log('You must pass img name path to encrypt or decrypt !');
        return false;
    }
    if (args['enc'] === undefined && args['dec'] === undefined) {
        console.log('You must pass mode (enc or dec)');
        return false;
    }
    if (args['key'] !== undefined && args['key'].length !== 8) {
        console.log('Passed key must be 8 characters long !');
        return false;
    }
    return true;
}

module.exports.validate = validate;
module.exports.arguments = args;