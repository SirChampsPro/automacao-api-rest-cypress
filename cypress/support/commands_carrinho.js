Cypress.Commands.add('cadastrar_carrinho', (token, productId) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/carrinhos',
        headers: {
            authorization: token
        },
        body: {
            produtos: [
                {
                    idProduto: productId,
                    quantidade: 1
                }
            ]
        },
        failOnStatusCode: false
    }).then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Cadastro realizado com sucesso')
        const carrinhoId = res.body._id
        return carrinhoId
    });
});

Cypress.Commands.add('listar_carrinhos', () => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3000/carrinhos',
        failOnStatusCode: false
    }).then((res) => {
        expect(res.status).to.equal(200);
    });
});

Cypress.Commands.add('listar_carrinhos_id', (carrinhoId) => {
    cy.request({
        method: 'GET',
        url: `http://localhost:3000/carrinhos/${carrinhoId}`,
        failOnStatusCode: false
    }).then((res) => {
        expect(res.status).to.equal(200);
    });
});


Cypress.Commands.add('concluir_compra', (token) => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/carrinhos/concluir-compra',
        headers: {
            authorization: token
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        cy.log('Compra concluida, carrinho será deletado');
    });
});

Cypress.Commands.add('cancelar_compra', (token) => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/carrinhos/cancelar-compra',
        headers: {
            authorization: token
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        cy.log('Compra cancelada, carrinho será deletado');
    });
});