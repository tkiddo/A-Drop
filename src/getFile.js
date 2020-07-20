const fs = require('fs');
const { join, resolve, extname } = require('path');
const fm = require('front-matter');

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
        if (extname(item) === '.md') {
          const data = fs.readFileSync(fPath, 'utf8');
          const content = fm(data);
          const { attributes: { title, description } } = content;
          fPath = fPath.replace(/\\/g, '_').substr(3);
          jsonFiles.push({
            meta: fPath.split('_')[0],
            path: fPath,
            name: item,
            title,
            description
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
