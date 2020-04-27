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
function getImgExtension(img) {
   return img.split('.').reverse()[0];
}

module.exports.getImageData = getImageData;
module.exports.createImage = createImage;
module.exports.getImgExtension = getImgExtension;