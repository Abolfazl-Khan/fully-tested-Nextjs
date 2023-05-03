import { resetDB } from '__tests__/__mocks__/db/utils/reset-db';
import { defineConfig } from 'cypress';
import { addBand } from 'lib/features/bands/queries';
import { addReservation } from 'lib/features/reservations/queries';

export default defineConfig({
  env: {
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'db:reset': () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
        addReservation: (newReservation) =>
          addReservation(newReservation).then(() => null),
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
