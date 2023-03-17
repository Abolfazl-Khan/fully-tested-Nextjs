import { resetDB } from '__tests__/__mocks__/db/utils/reset-db';
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'db:reset': () => resetDB().then(() => null),
      });
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
