import {defineConfig} from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npx vite --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  testDir: 'tests',
  testMatch: ['*.e2e.spec.ts'],
  use: {
    baseURL: 'http://localhost:4173',
  },
});
