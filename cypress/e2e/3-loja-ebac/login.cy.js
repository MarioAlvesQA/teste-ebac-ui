/// <reference types="cypress"/>

const profile = require('../../fixtures/profile.json') // Importing the profile.json file from fixtures folder to use test data in the test

describe('Funcionalidade: Login', () => {
    // Bloco onde vai o codigo da automacao

    beforeEach(() => {
        cy.visit('minha-conta/') // Visit the login page using baseUrl from cypress.config.js
        
    });

    afterEach(() => {
        cy.screenshot() // Faz uma captura de tela após cada teste, para verificar o resultado.
    });

    it('Deve fazer com login com sucesso', () => {
        cy.get('#username').type('marioteste@teste.com.br')
        cy.get('#password').type('Mario123..')
        cy.get('#rememberme').click()
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click() 
        // Resultado esperado apos o teste, o metodo é utilizado para validar a saida do teste.
        // .should('contain', ' deve ser seguido do texto que queremos validar ') 
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, marioteste (não é marioteste? Sair)') // metodo que confirma se o resultado de saída é o esperado 
    })
    
    // it.only ----> é utilizado para rodar apenas um teste, ele ignora os outros testes que estão dentro do mesmo describe. 
    it('Deve exibir uma mensagem de erro ao inserir usuário inválido ', () => {
        cy.get('#username').type('mario@teste.com.br')
        cy.get('#password').type('Mario123..')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.') // Durante a validação pode conter o texto integral OU partes dele como "Endereço de e-mail desconhecido"
        cy.get('.woocommerce-error > li').should('exist') // Verifica se o elemento existe na tela, se não existir o teste falha.
    })

    it('Deve exibir mensagem de erro ao inserir password inválido', () => {
        cy.get('#username').type('marioteste@teste.com.br')
        cy.get('#password').type('Errada@123..')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Erro: A senha fornecida para o e-mail marioteste@teste.com.br está incorreta. Perdeu a senha?')
    });

    it('Must do login sucessfully using the file profile.json', () => {
        // Create a log message on the cypress.io/ui screen to show if the field EMAIL is enabled or disabled
        cy.get('#username').then(($input) => {
            if ($input.is('disabled')) {
                cy.log('The EMAIL field is disabled, so we will not fill it in.')
            } else {
                cy.log('The EMAIL field is enabled, so we will fill it in')
            }
        });

        // Using the profile.json file to fill EMAIL and PASSWORD fields instead of hardcoding the values in the test
        cy.get('#username').type(profile.email);
        cy.get('#password').type(profile.password);
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, marioteste (não é marioteste? Sair)')
    });

    it('Must do login sucessfully using Fixture cypress.io feature.', () => {
        cy.fixture('profile').then( data_test => {
             
        })
    });

})