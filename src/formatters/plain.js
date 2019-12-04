import _ from 'lodash';

const checkObject = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const transformAstToString = (ast, parent) => {
  const diff = ast.map((item) => {
    const {
      key, type, value, beforeValue, afterValue, children,
    } = item;
    const path = parent.length > 0 ? `${parent}.${key}` : key;
    switch (type) {
      case 'nested':
        return `${transformAstToString(children, path)}`;
      case 'same':
        return '';
      case 'changed':
        return `Property '${path}' was updated. From ${checkObject(beforeValue)} to ${checkObject(afterValue)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'added':
        return `Property '${path}' was added with value: ${checkObject(value)}`;
      default:
        return 'Error';
    }
  });

  return _.flattenDeep(diff).filter((el) => el !== '').join('\n');
};

export default (ast) => transformAstToString(ast, '');
