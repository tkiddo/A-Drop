const fs = require('fs');
const { join, resolve, extname } = require('path');
const fm = require('front-matter');

function formatJson(json) {
  const result = {};
  json.forEach((item) => {
    const { dir, meta } = item;
    if (result[dir]) {
      if (!result[dir][meta]) {
        result[dir][meta] = [];
      }
      result[dir][meta].push(item);
    } else {
      result[dir] = {};
    }
  });
  return result;
}

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
          const {
            attributes: { title, description, meta }
          } = content;

          const pathArray = fPath.split('md\\');
          // eslint-disable-next-line prefer-destructuring
          fPath = pathArray[1];

          fPath = fPath.replace(/\\/g, '_');

          jsonFiles.push({
            dir: fPath.split('_')[0],
            path: fPath,
            name: item,
            title,
            description,
            meta,
            ctime: stat.ctime
          });
        }
      }
    });
  }

  findJsonFile(jsonPath);

  const str = JSON.stringify(formatJson(jsonFiles), null, '\t');

  fs.writeFile(resolve(process.cwd(), 'src/assets/mock/data.json'), str, (err) => {
    console.log('文件数量:', jsonFiles.length);
    if (err) {
      console.log('error...');
    }
  });
}

getJsonFiles(join(process.cwd(), 'src/md'));