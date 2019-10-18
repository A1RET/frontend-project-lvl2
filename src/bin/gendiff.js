#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .arguments('')
  .version('1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((fileBefore, fileAfter) => console.log(genDiff(fileBefore, fileAfter)));

program.parse(process.argv);
