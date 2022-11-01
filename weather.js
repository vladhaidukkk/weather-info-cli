#!/usr/bin/env node
import { parseArgs } from './helpers/args.js';

function initCLI() {
  const args = process.argv.slice(2);
  const opts = parseArgs(args);

  console.log(opts);
}

initCLI();
