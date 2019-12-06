import _ from 'lodash';

const stringify = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }

  const transformObjectToString = ([key, objectValue]) => `{\n${indent}${'  '.repeat(3)}${key}: ${objectValue}\n${indent}  }`;

  return Object.entries(value).map(transformObjectToString);
};

const types = {
  nested: (indent, node, fn, indentSize) => `${indent}  ${node.key}: {\n${fn(node.children, indentSize + 2)}\n${indent}  }`,
  same: (indent, node) => `${indent}  ${node.key}: ${stringify(node.value, indent)}`,
  changed: (indent, node) => `${indent}- ${node.key}: ${stringify(node.beforeValue, indent)}\n${indent}+ ${node.key}: ${stringify(node.afterValue, indent)}`,
  removed: (indent, node) => `${indent}- ${node.key}: ${stringify(node.value, indent)}`,
  added: (indent, node) => `${indent}+ ${node.key}: ${stringify(node.value, indent)}`,
};

const transformAstToString = (ast, indentSize) => {
  const diff = ast.map((item) => {
    const { type } = item;
    const indent = '  '.repeat(indentSize);

    return types[type](indent, item, transformAstToString, indentSize);
  });

  return _.flattenDeep(diff).join('\n');
};

export default (ast) => `{\n${transformAstToString(ast, 1)}\n}`;
