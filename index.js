let fs = require('fs');
let jpeg = require('jpeg-js');
let jpegData = fs.readFileSync('img_data_logo.jpg');
let rawImageData = jpeg.decode(jpegData);



// Creates img_data_logo.mif
let colors8bit = [];
let i = 0;
while (i < rawImageData.data.length) {
    let color = {
        r: rawImageData.data[i++],
        g: rawImageData.data[i++],
        b: rawImageData.data[i++],
        a: rawImageData.data[i++],
    };
    let decodedColor = {
        r: color.r.toString(2).slice(0, 3),
        g: color.g.toString(2).slice(0, 3),
        b: color.b.toString(2).slice(0, 2),
    };
    let splittedColor = decodedColor.b + decodedColor.g + decodedColor.r;
    splittedColor = parseInt(splittedColor, 2).toString(16);
    while (splittedColor.length < 2) {
        splittedColor = '0' + splittedColor;
    }
    colors8bit.push(splittedColor);
}

// image data
let fileContent = "WIDTH = 8;\nDEPTH = 307200;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN";

colors8bit.forEach((v, i) => {
    fileContent += `\n${i.toString(16)}:${v};`;
});

fileContent += `\nEND;`;

fs.writeFile('img_data_logo.mif', new Buffer(fileContent), (err) => {
    if (err) {
        throw err;
    }
    console.log("The file was succesfully saved!");
});



// Creates index_logo.mif
let index_logo = [];
for (let i = 0; i < 256; i++) {
    let iHex = i.toString(2);
    while (iHex.length < 8) {
        iHex = '0' + iHex;
    }

    let b = iHex.charAt(0) + iHex.charAt(1) + '000000';
    let g = iHex.charAt(2) + iHex.charAt(3) + iHex.charAt(4) + '00000';
    let r = iHex.charAt(5) + iHex.charAt(6) + iHex.charAt(7) + '00000';
    let color = b + g + r;
    color = parseInt(color, 2).toString(16);
    while (color.length < 6) {
        color = '0' + color;
    }
    index_logo.push(color);
}

fileContent = "WIDTH = 24;\nDEPTH = 256;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN";

index_logo.forEach((v, i) => {
    fileContent += `\n${i.toString(16)}:${v};`;
});

fileContent += `\nEND;`;

fs.writeFile('index_logo.mif', new Buffer(fileContent), (err) => {
    if (err) {
        throw err;
    }
    console.log("The file was succesfully saved!");
}); 