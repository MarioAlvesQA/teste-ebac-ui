// referencia e Assim traz os metodos do Cypress
/// <reference types="cypress" />

// descricao, dentro do describe colocamos apenas descricao base dos testes
describe ('Funcionalidade Torneio Limitless - Merida Mexico', () => {
    // testes ficam dentro do bloco, este bloco é uma função
    // it --> é o cenário de teste
    // () => --> é a função que contém o teste
    // cy.visit('url_da_pagina') --> visita a url da página
    // cy.get('seletor').should('have.value', 'valor_esperado') 
    // --> verifica se o valor do elemento é igual ao esperado
   it('Acesso site Limitless', () => {
    cy.visit('https://www.magazineluiza.com.br/');
    cy.get('a[href="https://www.magazineluiza.com.br/selecao/ofertasdodia/"]')
      .first()  
    //.should('be.visible')
      .click()
    cy.get('a[href="/pneu-aro-14-175-75r14-westlake-87t-175-75r14pr/p/235315900/au/aupa/"]')
      .click()
    cy.get('a[href="https://www.magazineluiza.com.br/selecao/ofertasdodia/"]')
      .first()  
      .click()

    //cy.wait(10000)

   })
   /*
   it('Aceso Merida', () => {
    cy.visit ('https://limitlesstcg.com/tournaments/')
    //cy.wait(400)
    //cy.contains('Regional Mérida').click();
    //cy.visit ('https://limitlesstcg.com/tournaments/472')
    //cy.get('a[href="/tournaments/484"]').click();
    //cy.wait(10000);
    //cy.get('a[href="/decks/list/15732"]').click();
    //cy.wait(9000);
   })
   it ('Acesso regional merida direto', () => {
    cy.visit ('https://limitlesstcg.com/tournaments/472')
    cy.get('a[href="/players/153"]').click()
    //cy.wait(3000)
    //cy.get ('a[class="site-logo"]').click()
   })
   */
})
