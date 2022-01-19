describe("home page", () => {
  it("App deve estar online", () => {
    cy.viewport(1440, 900); //Ajusta a resolução do navegador
    cy.visit("/");
    cy.get('#page-home h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
  });
});