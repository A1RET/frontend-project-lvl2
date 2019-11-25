import ldsh from 'lodash';

const checkObject = (value) => {
  if (ldsh.isObject(value)) {
    return '[complex value]';
  } if (ldsh.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const astToString = (ast, parent) => {
  const diff = ast.reduce((acc, item) => {
    const {
      key, type, value, beforeValue, afterValue,
    } = item;
    let path = key;
    if (parent.length > 0) {
      path = `${parent}.${path}`;
    }
    switch (type) {
      case 'children':
        return [...acc, `${astToString(value, path)}`];
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

  return ldsh.flattenDeep(diff).join('\n');
};

export default (ast) => astToString(ast, '');
