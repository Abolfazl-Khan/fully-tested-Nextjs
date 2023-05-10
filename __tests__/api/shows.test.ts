import { testApiHandler } from 'next-test-api-route-handler';
import showsHandler from '../../pages/api/shows';
import showIdHandler from '../../pages/api/shows/[showId]';
import { readFakeData } from '../__mocks__/fakeData';

it('GET /api/shows returns shows from database', async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();

      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

it('GET /api/shows/[showId] returns correct data for the showId', async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});

it('POST /api/shows returns 401 for incorrect revalidation secret', async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = {
        secret: 'Not the real secret',
      };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'POST' });
      expect(res.status).toBe(401);
    },
  });
});
