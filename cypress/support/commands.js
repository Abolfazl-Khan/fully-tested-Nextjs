import '@testing-library/cypress/add-commands';

Cypress.Commands.add('resetDbAndIsrCache', () => {
  cy.task('db:reset');
  const secret = Cypress.env('REVALIDATION_SECRET');
  cy.request('GET', `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add('signIn', (email, password) => {
  // it would be better to use api here instead of signing in through UI
  cy.visit('/auth/signin');

  cy.findByLabelText(/email address/i)
    .clear()
    .type(email);
  cy.findByLabelText(/password/i)
    .clear()
    .type(password);

  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /sign in/i }).click();
  });

  cy.findByRole('heading', { name: /welcome/i }).should('exist');
});
