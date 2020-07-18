const fs = require('fs');
const { join, resolve, extname } = require('path');

function getJsonFiles(jsonPath) {
  const jsonFiles = [];
  function findJsonFile(path) {
    const files = fs.readdirSync(path);
    files.forEach((item) => {
      let fPath = join(path, item);
      const stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        fPath = fPath.replace(/\\/g, '_').substr(3);
        if (extname(item) === '.md') {
          jsonFiles.push({
            meta: fPath.split('_')[0],
            path: fPath,
            name: item
          });
        }
      }
    });
  }
  findJsonFile(jsonPath);
  console.log(jsonFiles.length);
  const str = JSON.stringify(jsonFiles, null, '\t');

  fs.writeFile(resolve(__dirname, 'assets/mock/data.json'), str, (err) => {
    if (err) {
      console.log('error...');
    }
  });
}

getJsonFiles('md');
