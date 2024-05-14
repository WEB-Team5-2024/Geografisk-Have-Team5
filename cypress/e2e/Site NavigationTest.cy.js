// cypress/e2e/site_navigation.cy.js

describe('Site Navigation Tests', () => {
  it('Should navigate through the main pages', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible').contains('Home').click();
    cy.url().should('include', '/');
    cy.get('nav').should('be.visible').contains('Map').click();
    cy.url().should('include', '/map');
    cy.get('nav').should('be.visible').contains('Calendar').click();
    cy.url().should('include', '/calender');
    cy.get('nav').should('be.visible').contains('About').click();
    cy.url().should('include', '/OmHaven');
  });

  it('Should have the correct title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Geografisk Have'); // Replace with your project's title
  });

  it('Should display the home page content correctly', () => {
    cy.visit('/');
    cy.get('.geografisk-have').should('be.visible');
  });

  it('Should navigate to the map view', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible').contains('Map').click();
    cy.url().should('include', '/map');
    cy.get('.map-container').should('be.visible');
  });

  it('Should display areas and allow selecting an area', () => {
    cy.visit('/map');
    cy.get('.menuItem').should('have.length.greaterThan', 0).first().click();
    cy.get('.selectedAreaContainer').should('be.visible');
  });

  it('Should navigate to the calendar view', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible').contains('Calendar').click();
    cy.url().should('include', '/calender');
    cy.get('.calendar-view').should('be.visible');
  });

  it('Should display events in the calendar', () => {
    cy.visit('/calender');
    cy.get('.event').should('have.length.greaterThan', 0); // Ensure there are events
  });

  it('Should display the about garden page content correctly', () => {
    cy.visit('/OmHaven');
    cy.get('.contentContainer').should('be.visible');
  });

  it('Should display the plant overview page content correctly', () => {
    cy.visit('/plants/Test Area'); // Replace 'Test Area' with a valid area name
    cy.get('.overviewContainer').should('be.visible');
    cy.get('.plantsGrid').should('be.visible');
    cy.get('.plantheader').should('contain', 'Test Area'); // Adjust as needed
  });

  it('Should display the single event page content correctly', () => {
    cy.visit('/event/1'); // Replace '1' with a valid event ID
    cy.get('.event-hero').should('be.visible');
    cy.get('.text-centered').should('contain', 'Test Event'); // Adjust as needed
  });

  it('Should display the single plant page content correctly', () => {
    cy.visit('/plant/1'); // Replace '1' with a valid plant ID
    cy.get('.header').should('be.visible');
    cy.get('.plant-name').should('contain', 'Test Plant'); // Adjust as needed
  });
});
