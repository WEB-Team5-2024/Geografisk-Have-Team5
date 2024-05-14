import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Update the base URL to match your development server
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
