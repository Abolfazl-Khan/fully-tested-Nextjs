it('should run auth flow for successful login to protected reservations page', () => {
  cy.task('db:reset').visit('/reservations/0');

  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'exist'
  );
  cy.findByRole('button', { name: /purchase/i }).should('not.exist');

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env('TEST_USER_EMAIL'));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env('TEST_PASSWORD'));

  cy.findByRole('main').within(() =>
    cy.findByRole('button', { name: /sign in/i }).click()
  );

  cy.findByRole('button', { name: /purchase/i }).should('exist');
  cy.findByRole('heading', { name: /the wandering bunnies/i }).should('exist');

  cy.findByRole('button', { name: Cypress.env('TEST_USER_EMAIL') }).should(
    'exist'
  );
  cy.findByRole('button', { name: /sign out/i }).should('exist');

  cy.findByRole('button', { name: /sign in/i }).should('not.exist');
});

it('should fail at login whith wrong user data, and then succeed with correct data', () => {
  cy.task('db:reset').visit('/user');

  cy.findByRole('heading', { name: /Sign in to your account/i }).should(
    'exist'
  );
  cy.findByRole('heading', { name: /welcome/i }).should('not.exist');

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env('TEST_USER_EMAIL'));
  cy.findByLabelText(/password/i)
    .clear()
    .type('wrong password');

  cy.findByRole('main').within(() =>
    cy.findByRole('button', { name: /sign in/i }).click()
  );

  cy.findByText(/sign in failed/i).should('exist');

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env('TEST_USER_EMAIL'));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env('TEST_PASSWORD'));

  cy.findByRole('main').within(() =>
    cy.findByRole('button', { name: /sign in/i }).click()
  );

  cy.findByRole('heading', { name: /welcome/i }).should('exist');
  cy.findByRole('heading', { name: /your tickets/i }).should('exist');

  cy.findByRole('button', { name: Cypress.env('TEST_USER_EMAIL') }).should(
    'exist'
  );
  cy.findByRole('button', { name: /sign out/i }).should('exist');
  cy.findByRole('button', { name: /sign in/i }).should('not.exist');
});

it('should redirects to sign-in for protected pages', () => {
  cy.fixture('protected-pages.json').then((urls) => {
    urls.forEach((urlItem) => {
      cy.visit(urlItem);
      cy.findByLabelText(/email address/i).should('exist');
      cy.findByLabelText(/password/i).should('exist');
    });
  });
});

it('should not show sign-in page already signed in', () => {
  cy.task('db:reset').signIn(
    Cypress.env('TEST_USER_EMAIL'),
    Cypress.env('TEST_PASSWORD')
  );

  cy.visit('/reservations/0');

  cy.findByRole('heading', { name: /sing in to your account/i }).should(
    'not.exist'
  );
  cy.findByRole('button', { name: /purchase/i }).should('exist');
});
