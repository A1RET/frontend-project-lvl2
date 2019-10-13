#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
  .arguments('')
  .version('1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);
