it('skips client-side bundle, ', () => {
  cy.request('/bands')
    .its('body')
    .then((html) => {
      const noScriptHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
      cy.state('document').write(noScriptHtml);
    });
  cy.findByRole('heading', { name: /the wandering bunnies/i }).should('exist');
  cy.findByRole('heading', { name: /shamrock pete/i }).should('exist');
  cy.findByRole('heading', { name: /the joyous nun riot/i }).should('exist');
});
