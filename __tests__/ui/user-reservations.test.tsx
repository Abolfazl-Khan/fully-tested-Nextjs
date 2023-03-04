import { render, screen } from '@testing-library/react';
import { UserReservations } from '@/components/user/UserReservations';

it('should display "purchase more" button when the user has already choosed some tickets', async () => {
  render(<UserReservations userId={1} />);

  const purchaseButton = await screen.findByRole('button', {
    name: /purchase more tickets/i,
  });

  expect(purchaseButton).toBeInTheDocument();
});

it('should display "purchase" button when the user has not chosen any tickets', async () => {
  render(<UserReservations userId={0} />);

  const purchaseButton = await screen.findByRole('button', {
    name: /purchase tickets/i,
  });

  expect(purchaseButton).toBeInTheDocument();

  const heading = screen.queryByRole('heading', {
    name: /your tickets/i,
  });
  expect(heading).not.toBeInTheDocument();
});
