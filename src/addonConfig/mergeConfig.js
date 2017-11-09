module.exports = function mergeConfig(parsedFiles) {
  return parsedFiles.reduce((addons, parsedFile) => {
    if (!addons[parsedFile.fileName]) {
      addons[parsedFile.fileName] = {};
    }
    if (!addons[parsedFile.fileName][parsedFile.hash]) {
      addons[parsedFile.fileName][parsedFile.hash] = {
        fileSize: parsedFile.fileSize,
        files: []
      };
    }

    addons[parsedFile.fileName][parsedFile.hash].files.push(parsedFile.wtfDate);

    return addons;
  }, {});
};
