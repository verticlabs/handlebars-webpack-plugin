const path = require("path");
const sanitizePath = require("./sanitizePath");


/**
 * Returns the target filePath of a handlebars template
 * @param  {String} filePath            - input filePath
 * @param  {String} rootPath            - input rootPath
 * @param  {String} [outputTemplate]    - template for output filename. If ommited, the same filename stripped of its extension will be used
 * @return {String} target filePath
 */
module.exports = function getTargetFilepath(filePath, rootPath, outputTemplate) {
    filePath = sanitizePath(filePath);
    rootPath = sanitizePath(rootPath);

    if (outputTemplate == null) {
        return filePath.replace(path.extname(filePath), "");
    }

    const folderPath = path
        .dirname(filePath)
        .split(rootPath)[1];

    const fileName = path
        .basename(filePath)
        .replace(path.extname(filePath), "");

    return outputTemplate
        .replace("[path]", folderPath)
        .replace("[name]", fileName);
};
