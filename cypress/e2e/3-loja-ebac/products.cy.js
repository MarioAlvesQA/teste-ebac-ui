/// <reference types="cypress"/>

describe('Feature: Products', () => {

    beforeEach('Visit store products homepage', () => {
        cy.visit('') // Visit using baseUrl from cypress.config.js
    });

    afterEach('Take a Screenshot as evidence after each test is concluded', () => {
        cy.screenshot()
    });

    it.only('Should select a product from the list', () => {

        cy.get('.product-block').first().click() // Select the first product from the list
        
        cy.get('.single_add_to_cart_button').should('exist')
        cy.get('.summary').should('contain', 'Size')
        cy.get('.summary').should('contain', 'Color')
        cy.get('.summary').should('contain', 'SKU:')
    });

    it('Should select product by its index using .eq() method', () => {

        cy.get('.product-block').eq(2).click() // Select the third product from the list

        cy.get('.single_add_to_cart_button').should('exist')
        cy.get('.summary').should('contain', 'Size')
        cy.get('.summary').should('contain', 'Color')
        cy.get('.summary').should('contain', 'SKU: ')
        
    });

    it('Should select a specific product from the list by its name', () => {

        cy.get('.product-block').contains('Ariel Roll Sleeve Sweatshirt').click() // Select the product by its name

        cy.get('.summary').should('contain', 'Ariel Roll Sleeve Sweatshirt') // Verify that the correct product page is displayed
        cy.get('.summary').should('contain', 'SKU: WH09') // Verify that the correct SKU is displayed
        cy.get('.single_add_to_cart_button').should('exist') // Verify that the "Add to Cart" button existis on the product page
    });
})
