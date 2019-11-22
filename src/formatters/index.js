import recursive from './recursive';

const formatters = {
  diff: recursive,
};

export default (ast, format) => formatters[format](ast);
