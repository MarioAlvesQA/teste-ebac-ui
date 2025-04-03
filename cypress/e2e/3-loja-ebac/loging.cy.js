/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {
    // Bloco onde vai o codigo da automacao

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        
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

})