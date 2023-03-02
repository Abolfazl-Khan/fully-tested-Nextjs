import { rest } from 'msw';
import { readFakeData } from '../fakeData';

export const handlers = [
  rest.get('http://localhost:3000/api/shows/:showId', async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;
    return res(
      ctx.json({
        show: fakeShows[+showId],
      })
    );
  }),
];