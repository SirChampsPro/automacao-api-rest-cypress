/// <reference types="Cypress"/>

describe('Validar fluxo carrinho', () => {
    it('Cadastrar carrinho e concluir compra', () => {
        cy.login_token_novo_adm().then((token) => {
            cy.cadastrar_carrinho(token, 'BeeJh5lz3k6kSIzA');
            cy.concluir_compra(token);
        });

    });

    it('Cadastrar carrinho e cancelar compra', () => {
        cy.login_token_novo_adm().then((token) => {
            cy.cadastrar_carrinho(token, 'BeeJh5lz3k6kSIzA');
            cy.cancelar_compra(token);
        });

    });

    it('Listar carrinhos', () => {
        cy.listar_carrinhos().then((response) => {
            expect(response.status).to.equal(200);
        })
    });

    it('Listar carrinhos por ID', () => {
        cy.login_token_novo_adm().then((token) => {
            cy.cadastrar_carrinho(token, 'BeeJh5lz3k6kSIzA').then((carrinhoId) => {
                cy.listar_carrinhos_id(carrinhoId).then((response) => {
                    expect(response.status).to.equal(200);
                    cy.log(response.body._id)
                    cy.concluir_compra(token);
                })
            })
        })
    });
});