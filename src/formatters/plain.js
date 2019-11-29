import _ from 'lodash';

const checkObject = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const astToString = (ast, parent) => {
  const diff = ast.reduce((acc, item) => {
    const {
      key, type, value, beforeValue, afterValue, children,
    } = item;
    const path = parent.length > 0 ? `${parent}.${key}` : key;
    switch (type) {
      case 'nested':
        return [...acc, `${astToString(children, path)}`];
      case 'same':
        return [...acc];
      case 'changed':
        return [...acc, `Property '${path}' was updated. From ${checkObject(beforeValue)} to ${checkObject(afterValue)}`];
      case 'removed':
        return [...acc, `Property '${path}' was removed`];
      case 'added':
        return [...acc, `Property '${path}' was added with value: ${checkObject(value)}`];
      default:
        return 'Error';
    }
  }, []);

  return _.flattenDeep(diff).join('\n');
};

export default (ast) => astToString(ast, '');
