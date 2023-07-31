import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const css = /.css$/g;

const scss = /.scss$/g;

const moduleScss = /.module.scss$/g;

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    threads: true,
    useAtomics: true,
    clearMocks: true,
    passWithNoTests: true,
    setupFiles: './src/setupTests.ts',
    env: {
      NODE_ENV: 'test',
    },
    css: {
      exclude: [css, scss, moduleScss],
      modules: {
        classNameStrategy: 'scoped',
      },
    },
    coverage: {
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'text', 'text-summary'],
      lines: 80,
      perFile: true,
      reportOnFailure: true,
    },
    alias: {
      '@components': resolve(__dirname, 'src', 'shared', 'components'),
      '@shared': resolve(__dirname, 'src', 'shared'),
    },
  },
});
