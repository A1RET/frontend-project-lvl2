import path from 'path';
import fs from 'fs';
import gendiff from '../src';

test('gendiff', () => {
  const before = path.resolve(__dirname, `_fixtures_/before_plain.json`);
  const after = path.resolve(__dirname, `_fixtures_/after_plain.json`);
  const result = fs.readFileSync(path.resolve(__dirname, `_fixtures_/result_plain.txt`), 'utf8');

  expect(gendiff(before, after)).toBe(result);
});