import _ from 'lodash';

const checkObject = (value, indent) => {
  const objectToString = ([key, objectValue]) => `{\n${indent}${'  '.repeat(3)}${key}: ${objectValue}\n${indent}  }`;

  return _.isObject(value) ? Object.entries(value).map(objectToString) : value;
};

const transformAstToString = (ast, indentSize) => {
  const diff = ast.map((item) => {
    const {
      key, type, value, beforeValue, afterValue, children,
    } = item;
    const indent = '  '.repeat(indentSize);
    switch (type) {
      case 'nested':
        return `${indent}  ${key}: {\n${transformAstToString(children, indentSize + 2)}\n${indent}  }`;
      case 'same':
        return `${indent}  ${key}: ${checkObject(value, indent)}`;
      case 'changed':
        return `${indent}- ${key}: ${checkObject(beforeValue, indent)}\n${indent}+ ${key}: ${checkObject(afterValue, indent)}`;
      case 'removed':
        return `${indent}- ${key}: ${checkObject(value, indent)}`;
      case 'added':
        return `${indent}+ ${key}: ${checkObject(value, indent)}`;
      default:
        return 'Error';
    }
  });

  return _.flattenDeep(diff).join('\n');
};

export default (ast) => `{\n${transformAstToString(ast, 1)}\n}`;
