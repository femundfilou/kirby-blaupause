import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import laravel from 'laravel-vite-plugin';
import { browserslistToTargets } from 'lightningcss';
import browserslist from "browserslist"
import { homedir } from 'os'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "APP");
  return {
    build: {
      cssMinify: 'lightningcss'
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist(["last 2 versions", ">= 0.4%", "not dead", "Firefox ESR", "not op_mini all", "not and_uc > 0"]))
      }
    },
    plugins: [
      svelte(),
      laravel({
        input: ['frontend/index.ts', 'frontend/panel.css'],
        refresh: [
          'backend/site/snippets/**',
          'backend/site/templates/**'
        ],
        detectTls: env.APP_URL.replace(new RegExp("https?://"), ""),
      })
    ],
    resolve: {
      alias: {
        '@styles': resolve(__dirname, 'frontend/styles/'),
        '@': resolve(__dirname, 'frontend/')
      }
    },
    server: setServerConfig()
  }
})


function setServerConfig() {
  const host = "vite.test";
  const baseConfig = {
    open: false,
    cors: true,
    host,
    hmr: { host },
    port: 3000,
    strictPort: true,
  }

  let keyPath = resolve(homedir(), `.config/valet/Certificates/${host}.key`)
  let certificatePath = resolve(homedir(), `.config/valet/Certificates/${host}.crt`)

  if (!fs.existsSync(keyPath)) {
    return baseConfig
  }

  if (!fs.existsSync(certificatePath)) {
    return baseConfig
  }

  return {
    ...baseConfig,
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certificatePath),
    },
  }
}
