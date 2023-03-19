import { generateNewBand } from '../../../__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '../../../lib/features/reservations/utils';

it('should navigate to shows route and displays the heading correctly ', () => {
  cy.visit('/');
  cy.findByRole('button', { name: /shows/i }).click();
  cy.findByRole('heading', { name: /upcoming shows/i }).should('exist');
});

it('should navigate to bands route and displays the header correctly', () => {
  cy.visit('/');
  cy.findByRole('button', { name: /bands/i }).click();
  cy.findByRole('heading', { name: /our illustrious performers/i }).should(
    'exist'
  );
});

it('should navigate to the band page that existed at build time and dispays the band name correctly', () => {
  cy.task('db:reset').visit('/bands/1');
  cy.findByRole('heading', { name: /Shamrock Pete/i }).should('exist');
});

it('should display error when band id does not exist', () => {
  cy.task('db:reset').visit('/bands/1234');
  cy.findByText(/error: band not found/i).should('exist');
});

it('should navigate to the band page that did not existed at build time and dispays the band name correctly', () => {
  const newBandId = generateRandomId();
  const newBand = generateNewBand(newBandId);
  cy.task('db:reset').task('addBand', newBand).visit(`/bands/${newBandId}`);
  cy.findByRole('heading', { name: newBand.name }).should('exist');
});
