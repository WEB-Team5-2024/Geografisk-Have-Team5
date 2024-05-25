describe('Admin Dashboard Tests', () => {
  const adminEmail = 'abdalrhmanaldarra@gmail.com';
  const adminPassword = 'Abd123';
  
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type=email]').type(adminEmail);
    cy.get('input[type=password]').type(adminPassword);
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/admin');
  });

  it('Should add a new plant', () => {
    cy.get('input[placeholder="Plant Name"]').type('Test Plant');
    cy.get('select').first().select('Japan'); // Ensure 'Japan' is an option
    cy.get('input[type="file"]').first().attachFile('test-plant.jpg'); // Ensure the file exists in cypress/fixtures
    cy.get('button.submit-btn').contains('Add Plant').click();
    
  });

  it('Should add a new event', () => {
    cy.get('input[placeholder="Event Title"]').type('Test Event');
    cy.get('input[type="date"]').type('2024-05-01');
    cy.get('input[placeholder="Program"]').type('Test Program');
    cy.get('input[type="file"]').first().attachFile('test-event.jpg'); // Ensure the file exists in cypress/fixtures
    cy.get('button.submit-btn').contains('Add Event').click();
  });

  it('Should upload an audio file', () => {
    cy.get('label.upload-btn').click(); // Use the label for file input trigger
    cy.get('input[type="file"]').first().attachFile('test-audio.mp3'); // Ensure the file exists in cypress/fixtures
    cy.get('select').first().select('Japan'); // Ensure 'Japan' is an option
  });
});
