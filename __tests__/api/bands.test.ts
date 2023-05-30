import { testApiHandler } from 'next-test-api-route-handler';
import bandHandler from '../../pages/api/bands';

it('POST /api/bands returns 401 for incorrect revalidation secret', async () => {
  await testApiHandler({
    handler: bandHandler,
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
