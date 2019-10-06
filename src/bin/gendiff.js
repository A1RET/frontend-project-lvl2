#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
  .arguments('')
  .version('1.0')
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
