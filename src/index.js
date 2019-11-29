import _ from 'lodash';
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
  const keys = _.union(Object.keys(objBefore), Object.keys(objAfter));

  const ast = keys.map((key) => {
    if (_.has(objBefore, key) && _.has(objAfter, key)) {
      if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
        return { key, type: 'nested', children: makeAst(objBefore[key], objAfter[key]) };
      }
      if (objBefore[key] === objAfter[key]) {
        return { key, type: 'same', value: objBefore[key] };
      }
      if (objBefore[key] !== objAfter[key]) {
        return {
          key, type: 'changed', beforeValue: objBefore[key], afterValue: objAfter[key],
        };
      }
    }
    if (_.has(objBefore, key) && !_.has(objAfter, key)) {
      return { key, type: 'removed', value: objBefore[key] };
    }
    return { key, type: 'added', value: objAfter[key] };
  });

  return ast;
};

export default (fileBeforePath, fileAfterPath, format) => {
  const obj1 = getData(fileBeforePath);
  const obj2 = getData(fileAfterPath);
  const ast = makeAst(obj1, obj2);

  return formatter(ast, format);
};
