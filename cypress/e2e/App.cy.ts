describe('Powerball App', () => {
  it('opens without error', () => {
    cy.visit('http://localhost:5173/');
  })

  it('renders the right elements', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Powerball');
    cy.get("[data-testid='drawn-number']").should('have.lengthOf', 8);
    cy.get("[data-testid='ticket-number']").should('have.lengthOf', 55);
  })

  it('fetches data when clicking the button Fetch',() => {
    cy.visit('http://localhost:5173/');
    cy.contains('Fetch latest result').click();
    cy.get("[data-testid='drawn-number']").should('not.be.empty','');
    cy.get("[data-testid='ticket-number']").should('have.lengthOf', 47);
    cy.get("[data-testid='ticket-number-drawn']").should('have.lengthOf', 8);
  })

  it('cleans data when clicking the button Clean',() => {
    cy.visit('http://localhost:5173/');
    cy.contains('Fetch latest result').click();
    cy.get("[data-testid='drawn-number']").should('not.be.empty','');
    cy.get("[data-testid='ticket-number']").should('have.lengthOf', 47);
    cy.get("[data-testid='ticket-number-drawn']").should('have.lengthOf', 8);
    
    // Click button clear
    cy.contains('Clear results').click();
    cy.get("[data-testid='drawn-number']").should('be.empty');
    cy.get("[data-testid='ticket-number']").should('have.lengthOf', 55);
    cy.get("[data-testid='ticket-number-drawn']").should('have.lengthOf', 0);
  })
})