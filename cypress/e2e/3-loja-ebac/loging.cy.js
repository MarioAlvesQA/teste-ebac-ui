/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {
    // Bloco onde vai o codigo da automacao
    it('Deve fazer com login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('marioteste@teste.com.br')
        cy.get('#password').type('Mario123..')
        cy.get('#rememberme').click()
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click() 
        // Resultado esperado apos o teste, o metodo é utilizado para validar a saida do teste.
        // .should('contain', ' deve ser seguido do texto que queremos validar ') 
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, marioteste (não é marioteste? Sair)') // metodo que confirma se o resultado de saída é o esperado 
    })
})