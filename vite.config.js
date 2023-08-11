/** @type {import('vite').UserConfig} */

import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_URL
  }
})
