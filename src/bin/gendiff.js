#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .arguments('')
  .version('1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'recursive')
  .arguments('<firstConfig> <secondConfig>')
  .action((fileBeforePath, fileAfterPath) => {
    console.log(genDiff(fileBeforePath, fileAfterPath, program.format));
  });

program.parse(process.argv);
