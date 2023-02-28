import { render, screen } from '@testing-library/react';
import BandComponent from '@/pages/bands/[bandId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

it('should display band info correctly', async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent error={null} band={fakeBands[0]} />);

  const heading = screen.getByRole('heading', {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();

  const description = screen.getByText(
    'blistering world music, supported by a moody water glass orchestra'
  );
  expect(description).toBeInTheDocument();

  const image = screen.getByAltText('band photo');
  expect(image).toBeInTheDocument();

  const link = screen.getByRole('link', { name: 'Adina Voicu' });
  expect(link).toHaveAttribute(
    'href',
    'https://pixabay.com/users/adinavoicu-485024/'
  );
});

it('should display error', () => {
  render(<BandComponent error='Something Wronge' band={null} />);
  const errorMessage = screen.getByRole('heading', {
    name: /something wronge/i,
  });
  expect(errorMessage).toBeInTheDocument();
});
