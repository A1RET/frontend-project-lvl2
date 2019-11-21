import path from 'path';
import fs from 'fs';
import gendiff from '../src';

test.each([
  ['before_recursive.json', 'after_recursive.json', 'result_recursive.txt'],
  ['before_recursive.yml', 'after_recursive.yml', 'result_recursive.txt'],
  ['before_recursive.ini', 'after_recursive.ini', 'result_recursive.txt'],
])('gendiff', (before, after, expected) => {
  const beforeFile = path.resolve(__dirname, `__fixtures__/${before}`);
  const afterFile = path.resolve(__dirname, `__fixtures__/${after}`);
  const result = fs.readFileSync(path.resolve(__dirname, `__fixtures__/${expected}`), 'utf8');

  expect(gendiff(beforeFile, afterFile)).toBe(result);
});
