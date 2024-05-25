describe('Geografisk Have Site Navigation Tests', () => {

  it('Should navigate to the home page', () => {
    cy.visit('/');
    cy.url().should('include', '/');
    cy.get('h1').should('contain', 'Geografisk have'); 
  });

  it('Should navigate to the About Garden page', () => {
    cy.visit('/');
    cy.get('button').contains('Om haven').click();
    cy.url().should('include', '/omHaven');
    cy.get('.contentContainer').should('be.visible'); 
    cy.get('h1.titleHeader').should('contain', 'Om haven');
  });

  it('Should navigate to the Map view', () => {
    cy.visit('/');
    cy.get('button').contains('Kort').click();
    cy.url().should('include', '/map');
    cy.get('.map-container').should('be.visible'); 
  });

  it('Should navigate to the Calendar view', () => {
    cy.visit('/');
    cy.get('button').contains('Event').click();
    cy.url().should('include', '/calender');
    cy.get('.calendar-view').should('be.visible'); 
  });

  
  

  it('Should navigate to a specific Plant page', () => {
    cy.visit('/plants/Japan'); // Example for Japan, can be changed to other valid area names
    cy.url().should('include', '/plants/Japan');
    cy.get('.overviewContainer').should('be.visible'); 
    cy.get('.plantsGrid').should('be.visible');
    cy.get('.plantheader').should('contain', 'Japan'); 
  });

  it('Should navigate to a single plant page', () => {
    cy.visit('/plant/Cg28304hQMzQYtQJb42Y'); 
    cy.url().should('include', '/plant/Cg28304hQMzQYtQJb42Y');
    cy.get('.header').should('be.visible'); 
    cy.get('.plant-name').should('contain', 'Daglilje');
  });

  it('Should navigate to a single event page', () => {
    cy.visit('/event/CTAyX6HBTfYihiZfEKFY'); 
    cy.url().should('include', '/event/CTAyX6HBTfYihiZfEKFY');
    cy.get('.event-card').should('be.visible'); 
    cy.get('.event-card-title').should('contain', 'Summerfest'); 
  });

  it('Should navigate to a specific Country view', () => {
    cy.visit('/areas/KKnJdOuRMIEMmsHnd4IA'); 
    cy.url().should('include', '/areas/KKnJdOuRMIEMmsHnd4IA');

  });

  it('Should navigate to the Plant Overview page', () => {
    cy.visit('/plants/Japan'); // Example for Japan, can be changed to other valid area names
    cy.url().should('include', '/plants/Japan');
    cy.get('.overviewContainer').should('be.visible'); 
    cy.get('.plantsGrid').should('be.visible');
    cy.get('.plantheader').should('contain', 'Japan'); 
  });
});
