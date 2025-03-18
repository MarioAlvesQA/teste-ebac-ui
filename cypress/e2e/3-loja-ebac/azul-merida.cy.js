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
    cy.visit ('https://limitlesstcg.com/tournaments')
    //cy.wait(10000)

   })
   it('Aceso Merida', () => {
    cy.visit ('https://limitlesstcg.com/tournaments')
    //cy.wait(400)
    //cy.contains('Regional Mérida').click();
    //cy.visit ('https://limitlesstcg.com/tournaments/472')
    cy.get('a[href="/tournaments/472"]')
      .contains('Regional Mérida')
      .click()
    cy.wait(3000)
    })

    it('Acesso decklists', () => {
    //cy.get('.loading-spinner', {timeout: 10000}).should('not.exist')
    cy.visit ('https://limitlesstcg.com/tournaments/472')
    //cy.get('loading-spinner', {timeout: 10000}).should('not.exist')
    cy.get('a[href="/decks/list/15732"]')
      .should('be.visible')
      .first()
      .click()
    cy.get('a.site-logo[href="/"]').click()
    // Acima eu usei a.class="site-logo" com a.href tudo HTML
    cy.get('a.leader-details[href="/decks/284"]').click()
    })
})
