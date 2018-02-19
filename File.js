let jpeg = require('jpeg-js');
let fs = require('fs');

/**
 * Reads picture and returns it's content.
 * 
 * @param {string} name File's name.
 * @returns {Buffer} Buffer value
 */
exports.getImageData = function(name = 'img_data_logo.jpg') {
    let jpegData = fs.readFileSync(name);
    let rawImageData = jpeg.decode(jpegData);
    return rawImageData.data;
}

/**
 * 
 * @param {string} name File's name. If file not exists - will be created new.
 * @param {string} fileContent File's content to save
 * @returns {void}
 */
exports.save = function(name, fileContent) {
    fs.writeFile(name, new Buffer(fileContent), err => {
        if (err) {
            throw err;
        }
        console.log("The file was succesfully saved!");
    }); 
}

/**
 * Saves image data to the file
 * 
 * @param colors8bit Array of strings - colors in short hex format (de)
 * @returns {void}
 */
exports.saveImageData = function(colors8bit) {
    let fileContent = "WIDTH = 8;\nDEPTH = 307200;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN";

    colors8bit.forEach((v, i) => {
        fileContent += `\n${i.toString(16)}:${v};`;
    });

    fileContent += `\nEND;`;

    exports.save('img_data_logo.mif', fileContent);
}

/**
 * Saves colors to the file
 * 
 * @param {string} index_logo Array of strings - colors in hex format (FFFFFF)
 * @returns {void}
 */
exports.saveImageColors = function(index_logo) {
    let fileContent = "WIDTH = 24;\nDEPTH = 256;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN";

    index_logo.forEach((v, i) => {
        fileContent += `\n${i.toString(16)}:${v};`;
    });

    fileContent += `\nEND;`;

    exports.save('index_logo.mif', fileContent);
}
