import path from 'path';
import fs from 'fs';
import gendiff from '../src';

test('gendiff', () => {
  const beforeJson = path.resolve(__dirname, '__fixtures__/before_plain.json');
  const afterJson = path.resolve(__dirname, '__fixtures__/after_plain.json');

  const beforeYaml = path.resolve(__dirname, '__fixtures__/before_plain.yml');
  const afterYaml = path.resolve(__dirname, '__fixtures__/after_plain.yml');

  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result_plain.txt'), 'utf8');

  expect(gendiff(beforeJson, afterJson)).toBe(result);
  expect(gendiff(beforeYaml, afterYaml)).toBe(result);
});
