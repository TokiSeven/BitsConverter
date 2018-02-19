import File from './File';
let rawImageData: Buffer = File.getImageData();


// Creates img_data_logo.mif
let colors8bit: string[] = [];
let i: number = 0;
while (i < rawImageData.length) {
    let color = {
        r: rawImageData[i++],
        g: rawImageData[i++],
        b: rawImageData[i++],
        a: rawImageData[i++],
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
File.saveImageData(colors8bit);


// Creates index_logo.mif
let index_logo: string[] = [];
for (let i: number = 0; i < 256; i++) {
    let iHex: string = i.toString(2);
    while (iHex.length < 8) {
        iHex = '0' + iHex;
    }

    let b: string = iHex.charAt(0) + iHex.charAt(1) + '000000';
    let g: string = iHex.charAt(2) + iHex.charAt(3) + iHex.charAt(4) + '00000';
    let r: string = iHex.charAt(5) + iHex.charAt(6) + iHex.charAt(7) + '00000';

    let color: string = b + g + r;
    color = parseInt(color, 2).toString(16);

    while (color.length < 6) {
        color = '0' + color;
    }

    index_logo.push(color);
}
File.saveImageColors(index_logo);
