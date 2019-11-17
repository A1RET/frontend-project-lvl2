import ldsh from 'lodash';
import parser from './parsers';

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

const checkObject = (value, indent) => {
  const objectToString = ([key, objectValue]) => `{\n${indent}${'  '.repeat(3)}${key}: ${objectValue}\n${indent}  }`;

  return ldsh.isObject(value) ? Object.entries(value).map(objectToString) : value;
};

const astToString = (ast, indentSize) => {
  const diff = ast.reduce((acc, item) => {
    const {
      key, type, value, beforeValue, afterValue,
    } = item;
    const indent = '  '.repeat(indentSize);
    switch (type) {
      case 'children':
        return [...acc, `${indent}  ${key}: {\n${astToString(value, indentSize + 2)}\n${indent}  }`];
      case 'same':
        return [...acc, `${indent}  ${key}: ${checkObject(value, indent)}`];
      case 'changed':
        return [...acc, `${indent}- ${key}: ${checkObject(beforeValue, indent)}\n${indent}+ ${key}: ${checkObject(afterValue, indent)}`];
      case 'removed':
        return [...acc, `${indent}- ${key}: ${checkObject(value, indent)}`];
      case 'added':
        return [...acc, `${indent}+ ${key}: ${checkObject(value, indent)}`];
      default:
        return 'Error';
    }
  }, []);

  return ldsh.flattenDeep(diff).join('\n');
};

export default (fileBefore, fileAfter) => {
  const obj1 = parser(fileBefore);
  const obj2 = parser(fileAfter);
  const ast = makeAst(obj1, obj2);

  return `{\n${astToString(ast, 1)}\n}`;
};
