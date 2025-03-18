// referencia e Assim traz os metodos do Cypress
/// <reference types="cypress" />

// descricao, dentro do describe colocamos apenas descricao base dos testes

// PRIMEIRO TESTE DE LOOPING
/*
describe ('Looping', () => {
    it('Acesso decklists', () => {
    Cypress._.times(10, (i) => { // Looping com Cypress._.times
        cy.log(`Execucao ${i + 1}`); // Contador do Looping de 1 + 1

        // Inicio do meu codigo que vai passar pelo looping de 10x
        cy.visit ('https://limitlesstcg.com/tournaments/472')
        cy.wait(400)
        //cy.get('loading-spinner', {timeout: 10000}).should('not.exist')
        cy.get('a[href="/decks/list/15732"]')
          .should('be.visible')
          .first()
          .click()
        cy.wait(400)
        cy.get('a.site-logo[href="/"]').click()
        // Acima eu usei a.class="site-logo" com a.href tudo HTML
        cy.wait(400)
        cy.get('a.leader-details[href="/decks/284"]').click()

    })

    })
})
*/

// --> SEGUNDO TESTE DE LOOPING COM CY.THEN()

/*
describe ('Looping 2', () => {

    it('Executa deck azul 10x',() => {
        
        const array = Array.from({ length: 10});
        
            cy.wrap(array).each((_, i) => {
                cy.log(`Execucao ${i + 1}`);

                 // Inicio do meu codigo que vai passar pelo looping de 10x
                cy.visit ('https://limitlesstcg.com/tournaments/472');
                
                cy.wait(500);
                
                //cy.get('loading-spinner', {timeout: 10000}).should('not.exist')
                cy.get('a[href="/decks/list/15732"]', {timeout: 10000})
                  .should('be.visible')
                  .first()
                  .click();

                cy.wait(500);

                cy.get('a.site-logo[href="/"]', {timeout: 10000})
                    .should('be.visible')
                    .click();
                
                // Acima eu usei a.class="site-logo" com a.href tudo HTML
                cy.wait(500)
                cy.get('a.leader-details[href="/decks/284"]', {timeout: 10000})
                    .should('be.visible')
                    .click();


            })
    })

    })
*/

// --> TERCEIRO TESTE DE LOOPING COM Funcao recursiva
/*
describe('Looping 2', () => {
    it('Executa deck azul 10x', () => {
        let i = 0;

        function executarTeste() {
            if (i < 10) {
                cy.log(`Execução ${i + 1}`);

                cy.visit('https://limitlesstcg.com/');

                cy.wait(2000);

                i++;
                cy.then(() => executarTeste()); // Chama a função novamente para a próxima execução
            }
        }

        executarTeste(); // Inicia o loop
    });
});

*/

// --> QUARTO TESTE DE LOOPING COM Catch para detectar erro e reiniciar

describe('Looping 2 - Retentativa automática', () => {
    it('Executa deck azul 10x e reinicia se falhar', () => {
        let execucoes = 0;
        let maxExecucoes = 100;
        let tentativas = 0;
        let maxTentativas = 50;

        // Função para capturar falhas globais
        Cypress.on('fail', (error, runnable) => {
            tentativas++;
            cy.log(`⚠️ Falha detectada! Tentativa ${tentativas} de ${maxTentativas}`);

            if (tentativas < maxTentativas) {
                cy.wait(2000); // Espera 2 segundos antes de tentar novamente
                executarTeste(); // Tenta novamente
                throw error; // Lança o erro novamente para evitar que o Cypress pare o teste
            } else {
                cy.log(`🚨 Erro após ${tentativas} tentativas. Abandonando esta execução.`);
                throw new Error('Número máximo de tentativas atingido');
            }
        });

        function executarTeste() {
            if (execucoes >= maxExecucoes) {
                cy.log('✅ Teste concluído com sucesso!');
                return;
            }

            cy.log(`🔄 Execução ${execucoes + 1} (Tentativa ${tentativas + 1})`);

            cy.visit('https://limitlesstcg.com/', { timeout: 10000 })
                .then(() => {
                    // Sucesso: incrementa execuções e reseta tentativas
                    execucoes++;
                    tentativas = 0;
                    cy.log(`✅ Execução ${execucoes} concluída com sucesso`);
                    if (execucoes < maxExecucoes) {
                        executarTeste(); // Próxima execução
                    } else {
                        cy.log('✅ Teste concluído com sucesso!');
                    }
                });
        }

        executarTeste(); // Iniciar loop
    });
});
