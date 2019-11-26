import ldsh from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers';
import formatter from './formatters';

const getData = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const fileExtention = path.extname(filePath);

  return parser(fileContent, fileExtention);
};

const makeAst = (objBefore, objAfter) => {
  const keys = ldsh.union(Object.keys(objBefore), Object.keys(objAfter));

  const ast = keys.reduce((acc, key) => {
    if (ldsh.has(objBefore, key) && ldsh.has(objAfter, key)) {
      if (ldsh.isObject(objBefore[key]) && ldsh.isObject(objAfter[key])) {
        return [...acc, {
          key,
          type: 'children',
          value: makeAst(objBefore[key], objAfter[key]),
        }];
      }

      if (objBefore[key] === objAfter[key]) {
        return [...acc, {
          key,
          type: 'same',
          value: objBefore[key],
        }];
      }

      if (objBefore[key] !== objAfter[key]) {
        return [...acc, {
          key,
          type: 'changed',
          beforeValue: objBefore[key],
          afterValue: objAfter[key],
        }];
      }
    }

    if (ldsh.has(objBefore, key) && !ldsh.has(objAfter, key)) {
      return [...acc, {
        key,
        type: 'removed',
        value: objBefore[key],
      }];
    }

    return [...acc, {
      key,
      type: 'added',
      value: objAfter[key],
    }];
  }, []);

  return ast;
};

export default (fileBefore, fileAfter, format) => {
  const obj1 = getData(fileBefore);
  const obj2 = getData(fileAfter);
  const ast = makeAst(obj1, obj2);

  return formatter(ast, format);
};
