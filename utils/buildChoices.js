const { readdirSync } = require('fs');
const { resolve } = require('path');

const componentsPath = resolve(__dirname, '../components');

const buildChoices = () =>
  readdirSync(componentsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      return { name: dirent.name };
    });

module.exports.buildChoices = buildChoices;
