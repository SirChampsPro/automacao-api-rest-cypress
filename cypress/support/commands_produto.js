import { faker } from "@faker-js/faker";

Cypress.Commands.add('cadastrar_produto', (token, nome) => {
    const numeroAleatorio = Math.floor(Math.random() * 1000)
    const produto = {
        nome: nome,
        preco: numeroAleatorio,
        descricao: faker.commerce.productDescription(),
        quantidade: 10
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
        headers: {
            authorization: token
        },
        body: produto,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('cadastrar_produto_aleatorio', (token) => {
    const numeroAleatorio = Math.floor(Math.random() * 1000)
    const produto = {
        nome: faker.commerce.productName(),
        preco: numeroAleatorio,
        descricao: faker.commerce.productDescription(),
        quantidade: 10
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
        headers: {
            authorization: token
        },
        body: produto,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('cadastrar_produto_usuario_sem_autorizacao', (token) => {
    const numeroAleatorio = Math.floor(Math.random() * 1000)
    const produto = {
        nome: faker.commerce.productName(),
        preco: numeroAleatorio,
        descricao: faker.commerce.productDescription(),
        quantidade: 10
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
        headers: {
            authorization: token
        },
        body: produto,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('listar_produto_id', (productId) => {
    cy.request({
        method: 'GET',
        url: `http://localhost:3000/produtos/${productId}`,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('listar_produtos_cadastrados', () => {
    cy.request('GET', 'http://localhost:3000/produtos').then((response) => {
        expect(response.status).to.equal(200);
        const produtos = response.body.produtos;
        cy.log(`Total de produtos encontrados: ${produtos.length}`);
        produtos.forEach((produto, index) => {
            console.log(`Produto ${index + 1}:`, produto);
            cy.log(`Produto ${index + 1}: ${produto.nome} | ${produto.preco} | ${produto._id}`);
        });
    });
});

Cypress.Commands.add('editar_produto', (token, productId) => {
    const numeroAleatorio = Math.floor(Math.random() * 1000)
    const produto = {
        nome: faker.commerce.productName(),
        preco: numeroAleatorio,
        descricao: faker.commerce.productDescription(),
        quantidade: 225
    }

    cy.request({
        method: 'PUT',
        url: `http://localhost:3000/produtos/${productId}`,
        headers: {
            authorization: token
        },
        body: produto,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('editar_produto_nome_repetido', (token, productId) => {
    const numeroAleatorio = Math.floor(Math.random() * 1000)
    const produto = {
        nome: 'Samsung 60 polegadas',
        preco: numeroAleatorio,
        descricao: faker.commerce.productDescription(),
        quantidade: 225
    }

    cy.request({
        method: 'PUT',
        url: `http://localhost:3000/produtos/${productId}`,
        headers: {
            authorization: token
        },
        body: produto,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('deletar_produto', (token, productId) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:3000/produtos/${productId}`,
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    })
});

Cypress.Commands.add('deletar_produtos', (token) => {
    cy.request('GET', 'http://localhost:3000/produtos').then((response) => {
        const produtos = response.body.produtos;

        if (produtos.length <= 1) {
            cy.log('Não há produtos suficientes para deletar (mínimo 2).');
            return;
        }

        const idsParaPular = ['BeeJh5lz3k6kSIzA', 'K6leHdftCeOJj8BJ'];
        produtos.forEach((produto, index) => {
            if (idsParaPular.includes(produto._id)) return;
            cy.request({
                method: 'DELETE',
                url: `http://localhost:3000/produtos/${produto._id}`,
                headers: {
                    authorization: token
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                cy.log(`Produto deletado: ${produto.nome} (index ${index + 1})`);
            });
        });
    });
});

Cypress.Commands.add('', () => {

});