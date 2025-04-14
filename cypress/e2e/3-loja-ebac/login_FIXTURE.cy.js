/// <reference types="cypress"/>

const loginprofile = require('../../fixtures/profile.json') // Importing the profile.json file from fixtures folder to use test data in the test feature Loging_FIXTURE.cy.js

describe('Feature: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta/') // Visit the login homepage using baseUrl from cypress.config.js
    })

    afterEach(() => {
        cy.screenshot() // Take a screenshot after each test is conclued to verify the result.
    })

    it('Must do login sucessfully using the file profile.json in FIXTURES folder', () => {
        // Create a log message on the cypress.io/ui screen to show if the field EMAIL is enabled or disabled
        cy.get('#username').then(($input) => {
            if ($input.is('disabled')) {
                cy.log('The EMAIL field is disabled, so we will not fill it in.')
            } else {
                cy.log('The EMAIL field is enabled, so we will fill it in')
            }
        });

        // Using the profile.json file to fill EMAIL and PASSWORD fields instead of hardcoding the values in the test
        cy.get('#username').type(loginprofile.email);
        cy.get('#password').type(loginprofile.password , { login: false });
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, marioteste (não é marioteste? Sair)') // Verify that the correct user is logged in
        
    });

    // It's Test is using the Cypress method cy.fixture() to load the profile.json file into the logindata variable
    // and then using the logindata variable to fill the EMAIL and PASSWORD fields in "minha-conta" EBAC-Shop homepage
    it.only('Must do login sucessfully using FIXTURE cypress.io method', () => {
        cy.fixture('profile').then( logindata => {
            // Using the profile.json file inside the logindata variable to fill the EMAIL field, using cy.fixture() method
            cy.get('#username').type(logindata.email , { log: true }); // The { log: true } option show the used EMAIL to log in on the cypress.io/ui screen 
            cy.get('#password').type(logindata.password , { log: false }); // The { log: false } option prevents the password to showed on the cypress.io/ui screen 
            cy.get('.woocommerce-form > .button').click();
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, marioteste (não é marioteste? Sair)');

        })
        
    });
})