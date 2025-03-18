// referencia e Assim traz os metodos do Cypress
/// <reference types="cypress" />

// descricao, dentro do describe colocamos apenas descricao base dos testes
describe ('Funcionalidade Login', () => {
    // testes ficam dentro do bloco, este bloco é uma função
    // it --> é o cenário de teste
    // () => --> é a função que contém o teste
    // cy.visit('url_da_pagina') --> visita a url da página
    // cy.get('seletor').should('have.value', 'valor_esperado') 
    // --> verifica se o valor do elemento é igual ao esperado
    
    /*
                            Importante:
    Sempre respeitar a formatação e espaços entre os comandos
    Não utilizar espaços entre os comandos para evitar erros durante exeucao
    Ex -> cy.get('input.class [name="login"]').click() -- Pode falhar porque tem espaço entre .class e [identifie=""]
    Ex 2 -> cy.get('input.class[name="login"] [value="Login"]').click()
    Exemplo 2 pode falhar porque tem espaço entre os identificadores name e value

    */
    it('Deve fazer login com sucesso', () => {
        cy.visit ('http://lojaebac.ebaconline.art.br/minha-conta/')

        // Abaixo usando o .type para que o cypress digite o valor após o .type
        // .type -> Indica digitar algo no caso .type('Mario123') é password
        cy.get('#username').type('mario.teste@teste.com.br')
        cy.get('#password').type('Mario123') 
        
        // Login utilizando input (tipo no HTML) com atributo name apenas
        // Exemplo 1:
        //cy.get('input[name="login"]').click()

        // utilizando a class=button -- input.class para utilizar a class
        // Exemplo 2:
        //cy.get('input.button[name="login"]').click()

        //Utilizei combinacao de input.class[name=""][value=""]
        // Exemplo 3:
        cy.get('input.button[name="login"][value="Login"]').click()

        // Digitar por um item que vou buscar em SEARCH
        cy.get('input[placeholder="Enter your search ..."]')
            .eq(1)
            .type('Running')
        
        // Clicar no botão de pesquisa SEARCH
        cy.get('.button-search.btn.btn-sm[type="submit"]')
            .eq(1)
            //.click({force:true}) -> Indice 0 .eq(0) é algum elemento oculto e por isso precisei utilizar {force:true}
            .click()

        // Tentar favoritar
        cy.get('a[href="?add_to_wishlist=4104"]').click({force:true})

        cy.get('a[data-title="Browse wishlist"]')
            .click({force:true})

        // Remover da Wishlist
        cy.get('a.remove.remove_from_wishlist[title="Remove this product"]')
            .click()

        // Voltar para homepage 
        // OBS: --> Nao preciso especificar a CLASS se for utilizado o DIV como class, coloco apenas .divClass
        // .logo-in-theme --> Primeira div CLASS do primeiro DIV da arvore  
        // Obs: .logo-in-theme --> é a primeira CLASS do primeiro DIV CLASS

        // .logo -->  Segunda DIV CLASS do segundo DIV da arvore
        // a.logo-img --> CLASS da Hook/Link (a)
        cy.get('.logo-in-theme > .logo > a > .logo-img').click()
    })

})

//cy.get('.logo-in-theme > .logo > a > .logo-img')