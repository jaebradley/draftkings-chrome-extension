const path = require('path');

const BASE_DIRECTORY = path.join(__dirname, '..');
const OUTPUT_DIRECTORY_NAME = 'build';
const OUTPUT_PATH = path.join(__dirname, `../${OUTPUT_DIRECTORY_NAME}`);
const ENTRY_FILE_PATHS = Object.freeze({
  CONTENT: path.join(__dirname, '../source/content'),
  BACKGROUND: path.join(__dirname, '../source/background'),
});

module.exports = {
  BASE_DIRECTORY,
  OUTPUT_DIRECTORY_NAME,
  OUTPUT_PATH,
  ENTRY_FILE_PATHS,
};
