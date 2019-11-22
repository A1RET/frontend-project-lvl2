import ldsh from 'lodash';

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

export default (ast) => `{\n${astToString(ast, 1)}\n}`;
