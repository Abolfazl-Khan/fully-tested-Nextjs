import { generateNewReservation } from '../../../__tests__/__mocks__/fakeData/newReservation';
import { generateRandomId } from '../../../lib/features/reservations/utils';

const ONE_SECOND = 1000;
const FIFTEEN_SECONDS = 15 * ONE_SECOND;
const THIRTY_SECONDS = 30 * ONE_SECOND;

it('should refresh the shows page after 30 seconds and check the sold out shows', () => {
  //revalidate interval is 30 seconds
  cy.clock();
  cy.task('db:reset').visit('/shows');

  //checking the shows that already has been sold out
  cy.findAllByText(/sold out/i).should('have.length', 1);

  //buying all the seats for the first show
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 10,
  });
  cy.task('addReservation', newReservation);

  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should('have.length', 1);

  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/sold out/i).should('have.length', 2);
});

it('should refresh the reservations page after fifteen seconds', () => {
  cy.clock();
  cy.task('db:reset').visit('/reservations/0');

  // signing in
  cy.findByRole('main').within(() =>
    cy.findByRole('button', { name: /sign in/i }).click()
  );

  cy.findByText(/10 seats left/i).should('exist');

  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 2,
  });
  cy.task('addReservation', newReservation);

  cy.tick(ONE_SECOND);
  cy.findByText(/10 seats left/i).should('exist');

  cy.tick(FIFTEEN_SECONDS);
  cy.findByText(/8 seats left/i).should('exist');
});
