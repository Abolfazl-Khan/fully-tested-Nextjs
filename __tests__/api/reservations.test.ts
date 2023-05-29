import { testApiHandler } from 'next-test-api-route-handler';
import reservationHandler from '../../pages/api/reservations/[reservationId]';
import userReservationsHandler from '../../pages/api/users/[userId]/reservations';

jest.mock('../../lib/auth/utils');

it('POST /api/reservations/[reservationId] to create new reservation', async () => {
  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      params.reservationId = 764576;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          seatCount: 1,
          showId: 1,
        }),
      });

      expect(res.status).toBe(201);
    },
  });
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      const json = await res.json();
      expect(json.userReservations.length).toEqual(3);
    },
  });
});
