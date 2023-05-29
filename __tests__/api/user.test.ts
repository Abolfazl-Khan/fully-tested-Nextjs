import { testApiHandler } from 'next-test-api-route-handler';
import userAuthHandler from '../../pages/api/users';
import userReservationsHandler from '../../pages/api/users/[userId]/reservations';
import { validateToken } from '../../lib/auth/utils';

jest.mock('../../lib/auth/utils');
const mockValidateToken = validateToken as jest.Mock;

it('POST /api/users receives token with correct credentials', async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@test.test',
          password: 'test',
        }),
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.user).toBeDefined();
      expect(json.user.id).toEqual(1);
      expect(json.user.email).toEqual('test@test.test');
      expect(json.user.token).toBeDefined();
    },
  });
});

it('GET /api/users/[userId]/reservations returns reservations', async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toBeDefined();
      expect(json.userReservations.length).toEqual(2);
    },
  });
});

it('GET /api/users/[userId]/reservations retunr no reservation for new user', async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 987689;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(0);
    },
  });
});

it('GET /api/reservations/[reservationId] returns 401 when not authorized', async () => {
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'GET',
      });
      expect(res.status).toBe(401);
    },
  });
});
