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

function sortJson(json) {
  if (Array.isArray(json)) {
    json.sort((a, b) => new Date(b.ctime) - new Date(a.ctime));
  } else {
    Object.keys(json).forEach((key) => {
      const ele = json[key];
      sortJson(ele);
    });
  }
}

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
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

  jsonFiles = formatJson(jsonFiles);

  sortJson(jsonFiles);

  const str = JSON.stringify(jsonFiles, null, '\t');

  fs.writeFile(resolve(process.cwd(), 'src/assets/mock/data.json'), str, (err) => {
    if (err) {
      console.log('error...');
    }
  });
}

getJsonFiles(join(process.cwd(), 'src/md'));
