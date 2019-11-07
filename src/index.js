import ldsh from 'lodash';
import parser from './parsers';

const genDiff = (fileBefore, fileAfter) => {
  const objBefore = parser(fileBefore);
  const objAfter = parser(fileAfter);

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
