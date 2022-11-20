/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'

import Plugins from './presets'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Plugins(),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
