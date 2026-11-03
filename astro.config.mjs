// @ts-check
import { defineConfig } from 'astro/config';

// User site: served from the root of https://steven91007.github.io
export default defineConfig({
  site: 'https://steven91007.github.io',
  vite: {
    server: {
      // The repo lives on a Windows drive (/mnt/e) under WSL, where file-change events are unreliable:
      // poll so `astro dev` picks up edits.
      watch: { usePolling: true, interval: 400 },
    },
  },
});
