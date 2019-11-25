import recursive from './recursive';
import plain from './plain';
import json from './json';

const formatters = {
  recursive,
  plain,
  json,
};

export default (ast, format) => formatters[format](ast);
