import path from 'path';
import fs from 'fs';
import gendiff from '../src';

test.each([
  ['before.json', 'after.json', 'recursive'],
  ['before.yml', 'after.yml', 'recursive'],
  ['before.ini', 'after.ini', 'recursive'],
  ['before.json', 'after.json', 'plain'],
  ['before.yml', 'after.yml', 'plain'],
  ['before.ini', 'after.ini', 'plain'],
  ['before.json', 'after.json', 'json'],
  ['before.yml', 'after.yml', 'json'],
  ['before.ini', 'after.ini', 'json'],
])('gendiff', (before, after, format) => {
  const fileBeforePath = path.resolve(__dirname, `__fixtures__/${before}`);
  const fileAfterPath = path.resolve(__dirname, `__fixtures__/${after}`);
  const result = fs.readFileSync(path.resolve(__dirname, `__fixtures__/result_${format}.txt`), 'utf8');

  expect(gendiff(fileBeforePath, fileAfterPath, format)).toBe(result);
});
