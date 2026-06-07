#!/usr/bin/env node
import('../dist/cli.js').catch((error) => {
  console.error('Error: dist/cli.js not found. Run `npm run build` first.');
  console.error(error.message);
  process.exit(1);
});
