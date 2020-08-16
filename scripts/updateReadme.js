const fs = require('fs');
const path = require('path');

const root = process.cwd();
const json = require(path.join(root, 'src/assets/mock/data.json'));

const preAppend = 'https://github.com/justforfunmy/A-Drop/blob/master/src/md/';

function appendFile(string) {
  try {
    fs.appendFileSync(path.resolve(root, 'README.md'), string);
  } catch (err) {
    /* Handle the error */
  }
}

function getData(data) {
  if (Array.isArray(data)) {
    data.forEach((element) => {
      const str = `- [${element.title}](${preAppend}${element.path.replace('_', '/')}) \n`;
      appendFile(str);
    });
  } else {
    Object.keys(data).forEach((key) => {
      const element = data[key];
      if (Array.isArray(element)) {
        appendFile(`## ${key} \n`);
      }
      if (!element.title) {
        getData(data[key]);
      }
    });
  }
}

fs.writeFileSync(path.resolve(root, 'README.md'), '# A Drop \n');

getData(json);
