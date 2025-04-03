/// <reference types="cypress" />

describe('Feature: Register', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    })

    afterEach(() => {
        cy.screenshot() // Take a screenshot after each test to verify the result.
    })

    it('Should display an error message when trying to register with an existing email', () => {
        cy.get('#reg_email').type('marioteste@teste.com.br')
        cy.get('#reg_password').type('Mario123..')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-error').should('exist') // Check if the error message is displayed

        cy.get('.woocommerce-error').should('contain', 'Erro: Uma conta já está registrada com seu endereço de e-mail. Faça login.')
    })
})