#!/usr/bin/env node
import { parseArgs } from './helpers/args.js';
import { logHelp } from './services/log.service.js';

function initCLI() {
  const args = process.argv.slice(2);
  const opts = parseArgs(args);

  if (opts.h) {
    return logHelp();
  }
}

initCLI();
