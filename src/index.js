import ldsh from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const genDiff = (fileBefore, fileAfter) => {
  const fileBeforeContent = fs.readFileSync(fileBefore, 'utf-8');
  const fileAfterContent = fs.readFileSync(fileAfter, 'utf-8');

  const fileBeforeParser = parse(path.extname(fileBefore));
  const fileAfterParser = parse(path.extname(fileAfter));

  const objBefore = fileBeforeParser(fileBeforeContent);
  const objAfter = fileAfterParser(fileAfterContent);

  const keys = ldsh.union(Object.keys(objBefore), Object.keys(objAfter));

  const resultString = keys.reduce((acc, key) => {
    let string = '';
    if ((ldsh.has(objBefore, key) && ldsh.has(objAfter, key)) && objBefore[key] === objAfter[key]) {
      string = `    ${key}: ${objBefore[key]}\n`;
    }

    if ((ldsh.has(objBefore, key) && ldsh.has(objAfter, key)) && objBefore[key] !== objAfter[key]) {
      string = `  + ${key}: ${objAfter[key]}\n  - ${key}: ${objBefore[key]}\n`;
    }

    if (ldsh.has(objBefore, key) && !ldsh.has(objAfter, key)) {
      string = `  - ${key}: ${objBefore[key]}\n`;
    }

    if (!ldsh.has(objBefore, key) && ldsh.has(objAfter, key)) {
      string = `  + ${key}: ${objAfter[key]}\n`;
    }

    return `${acc}${string}`;
  }, '{\n');

  return `${resultString}}`;
};

export default genDiff;
