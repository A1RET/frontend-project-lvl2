import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const types = {
  nested: (path, node, fn) => `${fn(node.children, path)}`,
  same: () => null,
  changed: (path, node) => `Property '${path}' was updated. From ${stringify(node.beforeValue)} to ${stringify(node.afterValue)}`,
  removed: (path) => `Property '${path}' was removed`,
  added: (path, node) => `Property '${path}' was added with value: ${stringify(node.value)}`,
};

const transformAstToString = (ast, parent) => {
  const diff = ast.map((item) => {
    const { key, type } = item;
    const path = parent.length > 0 ? `${parent}.${key}` : key;

    return types[type](path, item, transformAstToString);
  });

  return _.flattenDeep(diff).filter((el) => el !== null).join('\n');
};

export default (ast) => transformAstToString(ast, '');
