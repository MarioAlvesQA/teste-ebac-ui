/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Feature: Register', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });


    afterEach(() => {
        cy.screenshot()
    })

    it('Should complete register successfully with First and Last Name', () => {
        cy.get('#reg_email').type(faker.internet.email())
        cy.get('#reg_password').type('Teste@123..')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, ') // Check if the greeting message is displayed

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(faker.person.firstName('female'))
        cy.get('#account_last_name').type(faker.person.lastName())
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.') // Check if the message "Account details successfully updated" is displayed

    })

    it.only('Should complete register successfully with First and Last Name - Using variables', () => {

        // Ordem das variaveis influencia na execução do teste, pois o faker gera dados aleatórios.
        // posso usar a variavel femalename dentro do metodo email para criar um e-mail com o nome da pessoa.
        // Exemplo: var email = faker.internet.email(femalename)
        var femalename = faker.person.firstName('female')
        var malename = faker.person.firstName('male')
        var generalname = faker.person.firstName()
        var lastname = faker.person.lastName()
        var email = faker.internet.email()

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('Teste@123..')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, ') // Check if the greeting message is displayed

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(femalename)
        cy.get('#account_last_name').type(lastname)
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.') // Check if the message "Account details successfully updated" is displayed

    })


})