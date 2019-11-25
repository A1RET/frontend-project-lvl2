import recursive from './recursive';
import plain from './plain';

const formatters = {
  recursive,
  plain,
};

export default (ast, format) => formatters[format](ast);
