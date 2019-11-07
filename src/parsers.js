import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const fileExtention = path.extname(file);
  return parsers[fileExtention](fileContent);
};
