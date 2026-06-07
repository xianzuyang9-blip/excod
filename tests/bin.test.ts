import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { existsSync, renameSync } from 'node:fs';

describe('bin/excod.cjs', () => {
  it('explains how to recover when dist/cli.js is missing', () => {
    const distExists = existsSync('dist');
    if (distExists) {
      renameSync('dist', 'dist-test-backup');
    }

    try {
      const result = spawnSync(process.execPath, ['bin/excod.cjs'], {
        encoding: 'utf8',
      });

      expect(result.status).toBe(1);
      expect(result.stderr).toContain('Run `npm run build` first');
      expect(result.stderr).toContain('dist/cli.js');
    } finally {
      if (distExists) {
        renameSync('dist-test-backup', 'dist');
      }
    }
  });
});
