import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import { inject, minify } from 'vite-plugin-parse-html'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const ENV_VARS_PREFIX = 'ENV_'

export default defineConfig(({ mode }) => {
  const envs = { ...loadEnv(mode, __dirname, ENV_VARS_PREFIX), NODE_ENV: mode }

  const isDevelopment = mode === 'development'

  return {
    globals: true,
    define: { envs },
    test: {
      environment: 'jsdom',
    },
    esbuild: {
      define: { global: 'globalThis' },
    },
    envPrefix: ENV_VARS_PREFIX,
    build: {
      chunkSizeWarningLimit: 100_000, // 100kb
    },
    server: { port: 3000, host: '127.0.0.1' },
    plugins: [inject({ path: `${__dirname}/index.html` }), minify({ isMinify: true }), react(), viteTsConfigPaths({ root: './' })],
    resolve: {
      alias: {
        '@shared': resolve(__dirname, 'src', 'shared'),
        '@domains': resolve(__dirname, 'src', 'domains'),
      },
    },
    css: {
      modules: { generateScopedName: isDevelopment ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]' },
    },
  }
})
