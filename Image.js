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

/**
 * Returns distribution in BGR format.
 * Each key from b, g, r will have array of borders - first and latest index of 0 -> 255
 * 
 * @param {Object(red: number, green: number, blue: number)} averageColors 
 * 
 * @returns {Object(b: [number, number], g: [number, number], r: [number, number])}
 */
exports.getDistribution = function(averageColors) {
    const offset = 30;
    
    const r = averageColors.red;
    const b = averageColors.blue;
    const g = averageColors.green;

    let colors = {
        b: [0, 84],
        g: [85, 169],
        r: [170, 255],
    };
    
    // есть например с избытком красного
    // и очень маленьким синим
    // r + 30
    // b - 30
    
    if (r > g && r > b) {
        // r - max
        colors.r[0] -= offset;
        if (g > b) {
            colors.g[0] -= offset;
            colors.g[1] -= offset;
            colors.b[1] -= offset;
        } else if (g < b) {
            colors.g[1] -= offset;
        } else {
            colors.g[1] -= offset;
            colors.g[0] -= offset / 2;
            colors.b[1] -= offset / 2;
        }
    } else if (g > r && g > b) {
        // g - max
        if (r > b) {
            colors.b[1] -= offset;
            colors.g[0] -= offset;
        } else if (r < b) {
            colors.r[0] += offset;
            colors.g[1] += offset;
        } else {
            colors.g[0] -= offset / 2;
            colors.g[1] += offset / 2;
            colors.r[0] += offset / 2;
            colors.b[1] -= offset / 2;
        }
    } else {
        // b - max
        colors.b[1] += offset;
        if (r > g) {
            colors.g[0] += offset;
        } else if (r < g) {
            colors.g[0] += offset;
            colors.g[1] += offset;
            colors.r[0] += offset;
        } else {
            colors.g[0] += offset;
            colors.g[1] += offset / 2;
            colors.r[0] += offset / 2;
        }
    }

    return colors;
}