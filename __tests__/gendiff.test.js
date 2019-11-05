import path from 'path';
import fs from 'fs';
import gendiff from '../src';

test.each([['before_plain.json', 'after_plain.json', 'result_plain.txt'], ['before_plain.yml', 'after_plain.yml', 'result_plain.txt'], ['before_plain.ini', 'after_plain.ini', 'result_plain.txt']])('gendiff', (before, after, expected) => {
  const beforeFile = path.resolve(__dirname, `__fixtures__/${before}`);
  const afterFile = path.resolve(__dirname, `__fixtures__/${after}`);
  const result = fs.readFileSync(path.resolve(__dirname, `__fixtures__/${expected}`), 'utf8');

  expect(gendiff(beforeFile, afterFile)).toBe(result);
});
