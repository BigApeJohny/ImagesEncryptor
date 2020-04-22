const fs = require('fs');

async function getImageData(img) {
    return new Promise(async resolve => {
        await fs.readFile(img, (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
}

function createImage(arrayBuffer, imgName) {
    fs.writeFile(imgName, arrayBuffer, (err) => {
        if (err) throw err;
    });
}

module.exports.getImageData = getImageData;
module.exports.createImage = createImage;