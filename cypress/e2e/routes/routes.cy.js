// import { generateNewBand } from "../../../__tests__/__mocks__/fakeData/newBand";
// import { generateRandomId } from "../../../lib/features/reservations/utils";

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
