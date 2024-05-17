// cypress/e2e/login_tests.cy.js

describe('Admin Login Page Tests', () => {
    const adminEmail = 'abdalrhmanaldarra@gmail.com';
    const adminPassword = 'Abd123';

    it('Should visit the login page', () => {
        cy.visit('/login'); // Visit the login page
    });

    it('Should allow the admin to login', () => {
        cy.visit('/login');

        // Fill out the form with admin credentials
        cy.get('input[id=email]').type(adminEmail);
        cy.get('input[id=password]').type(adminPassword);

        // Submit the form
        cy.get('button[type=submit]').click();

        // Check for successful login
        cy.url().should('include', '/admin'); // Adjust the URL path as needed
    });

    it('Should show an error message with wrong credentials', () => {
        cy.visit('/login');

        // Fill out the form with wrong credentials
        cy.get('input[id=email]').type('wrong@example.com');
        cy.get('input[id=password]').type('wrongpassword');

        // Submit the form
        cy.get('button[type=submit]').click();

        // Check for error message
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Invalid login credentials'); // Adjust the error message text as needed
    });
});
