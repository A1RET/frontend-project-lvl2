import ldsh from 'lodash';
import fs from 'fs';

const genDiff = (fileBefore, fileAfter) => {
  const fileBeforeContent = fs.readFileSync(fileBefore);
  const fileAfterContent = fs.readFileSync(fileAfter);

  const objBefore = JSON.parse(fileBeforeContent);
  const objAfter = JSON.parse(fileAfterContent);

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
