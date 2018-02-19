/**
 * Returns average red, green & blue numbers
 * 
 * @param rawImageData
 */
exports.getAverageColor = function(rawImageData) {
    let red = 0;
    let green = 0;
    let blue = 0;
    let i = 0;

    while (i < rawImageData.length) {
        red += rawImageData[i++];
        green += rawImageData[i++];
        blue += rawImageData[i++];
        i++; // opacity
    }

    red /= i;
    green /= i;
    blue /= i;

    return { red, green, blue, };
}