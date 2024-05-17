// cypress/e2e/all_tests.cy.js

describe('Geografisk Have E2E Tests', () => {
    const adminEmail = 'abdalrhmanaldarra@gmail.com';
    const adminPassword = 'Abd123';
    
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type=email]').type(adminEmail);
      cy.get('input[type=password]').type(adminPassword);
      cy.get('button[type=submit]').click();
      cy.url().should('include', '/admin');
    });
  
    it('Should visit the login page', () => {
      cy.visit('/login');
    });
  
    it('Should allow a user to login', () => {
      cy.visit('/login');
      cy.get('input[type=email]').type(adminEmail);
      cy.get('input[type=password]').type(adminPassword);
      cy.get('button[type=submit]').click();
      cy.url().should('include', '/admin');
    });
  
    it('Should show an error message with wrong credentials', () => {
      cy.visit('/login');
      cy.get('input[type=email]').type('wrong@example.com');
      cy.get('input[type=password]').type('wrongpassword');
      cy.get('button[type=submit]').click();
      cy.get('.error-message').should('be.visible').and('contain', 'Invalid login credentials');
    });
  
    describe('Admin Dashboard Component', () => {
      it('Should display user info', () => {
        cy.get('.user-info').should('be.visible');
      });
  
      it('Should have a logout button', () => {
        cy.get('button.logout').should('be.visible');
      });
  
      it('Should log out successfully', () => {
        cy.get('.signout-button').click();
        cy.url().should('include', '/login');
      });
  
      it('Should add a new plant', () => {
        cy.visit('/admin');
        cy.get('input[placeholder="Plant Name"]').type('Test Plant');
        cy.get('select').select('Test Area'); // Ensure 'Test Area' is an option
        cy.get('input[type="file"]').attachFile('test-plant.jpg'); // Ensure the file exists in cypress/fixtures
        cy.get('button[type="submit"]').contains('Add Plant').click();
        cy.get('.items-list').should('contain', 'Test Plant');
      });
  
      it('Should add a new event', () => {
        cy.visit('/admin');
        cy.get('input[placeholder="Event Title"]').type('Test Event');
        cy.get('input[type="date"]').type('2024-05-01');
        cy.get('input[placeholder="Program"]').type('Test Program');
        cy.get('input[type="file"]').attachFile('test-event.jpg'); // Ensure the file exists in cypress/fixtures
        cy.get('button[type="submit"]').contains('Add Event').click();
        cy.get('.items-list').should('contain', 'Test Event');
      });
  
      it('Should upload an audio file', () => {
        cy.visit('/admin');
        cy.get('button').contains('Choose Audio').click();
        cy.get('input[type="file"]').attachFile('test-audio.mp3'); // Ensure the file exists in cypress/fixtures
        cy.get('select').select('Test Area'); // Ensure 'Test Area' is an option
        cy.get('button[type="submit"]').contains('Upload Audio').click();
        cy.get('.audio-list').should('contain', 'test-audio.mp3'); // Check if the audio is listed
      });
    });
  
    describe('Site Navigation', () => {
      it('Should navigate through the main pages', () => {
        cy.visit('/');
        cy.get('nav').contains('Home').click();
        cy.url().should('include', '/');
        cy.get('nav').contains('Map').click();
        cy.url().should('include', '/map');
        cy.get('nav').contains('Calendar').click();
        cy.url().should('include', '/calender');
      });
  
      it('Should have the correct title', () => {
        cy.visit('/');
        cy.title().should('eq', 'Geografisk Have'); // Replace with your project's title
      });
    });
  
    describe('Page Content', () => {
      it('Should display the home page content correctly', () => {
        cy.visit('/');
        cy.get('.geografisk-have').should('be.visible');
      });
  
      it('Should navigate to the map view', () => {
        cy.visit('/');
        cy.get('nav').contains('Map').click();
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
        cy.get('nav').contains('Calendar').click();
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
  });
  