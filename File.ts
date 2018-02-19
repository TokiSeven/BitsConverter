import jpeg from 'jpeg-js';
import fs from 'fs';

export default class File {
    /**
     * Reads picture and returns it's content.
     * 
     * @param {string} name File's name.
     * @returns {Buffer} Buffer value
     */
    static getImageData(name: string = 'img_data_logo.jpg'): Buffer {
        let jpegData = fs.readFileSync(name);
        let rawImageData = jpeg.decode(jpegData);
        return rawImageData.data;
    }

    /**
     * 
     * @param {string} name File's name. If file not exists - will be created new.
     * @param {string} fileContent File's content to save
     */
    static save(name: string, fileContent: string): void {
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
    static saveImageData(colors8bit: string[]): void {
        let fileContent: string = "WIDTH = 8;\nDEPTH = 307200;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN";

        colors8bit.forEach((v: string, i: number) => {
            fileContent += `\n${i.toString(16)}:${v};`;
        });

        fileContent += `\nEND;`;

        File.save('img_data_logo.mif', fileContent);
    }

    /**
     * Saves colors to the file
     * 
     * @param {string} index_logo Array of strings - colors in hex format (FFFFFF)
     * @returns {void}
     */
    static saveImageColors(index_logo: string[]): void {
        let fileContent: string = "WIDTH = 24;\nDEPTH = 256;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN";

        index_logo.forEach((v: string, i: number) => {
            fileContent += `\n${i.toString(16)}:${v};`;
        });

        fileContent += `\nEND;`;

        File.save('index_logo.mif', fileContent);
    }
}
