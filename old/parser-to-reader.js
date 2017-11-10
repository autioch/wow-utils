const macros = require('./macros.json');
const fs = require('fs');

const filenames = {};

macros.forEach(({ filename, lines, account, realm, character }) => {
  if (!filenames[filename]) {
    filenames[filename] = {
      filename,
      account,
      realm,
      character,
      macros: []
    };
  }
  filenames[filename].macros.push(lines);
});

const files = Object.values(filenames);

files.sort((fileA, fileB) => fileA.filename.localeCompare(fileB.filename));

let macros2count = 0;

files.forEach((file) => {
  file.macros.sort((macroA, macroB) => (macroA[0] || '').localeCompare(macroB[0] || ''));
  macros2count += file.macros.length;
});

console.log(`${files.length} files`);
console.log(`${macros.length} macros`);
console.log(`${macros2count} macros 2`);

fs.writeFile('reader-output.json', JSON.stringify(files, null, '  '), 'utf8', () => {});
