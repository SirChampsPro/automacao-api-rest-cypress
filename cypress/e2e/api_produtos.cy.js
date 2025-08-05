/// <reference types="Cypress"/>

describe('Validar fluxo de produtos', () =>{
    let productId

    it('Cadastrar produto', () =>{
        cy.realizar_login_retornar_token().then((token) => {
        expect(token).to.not.be.empty;
        cy.cadastrar_produto(token).then((response) =>{
        expect(response.status).to.equal(201)
        productId = response.body._id
        cy.log(`Produto cadastrado no id: ${productId}`)
            });
        });
    });

    it('Listar produto por id', () =>{
        cy.listar_produto_id(productId).then((response) =>{
            expect(response.status).to.equal(200);
        });
    });

    it('Listar produtos cadastrados antes de editar', () =>{
        cy.listar_produtos_cadastrados();
    });

    it('Editar produto cadastrado', () =>{
        cy.realizar_login_retornar_token().then((token) => {
            expect(token).to.not.be.empty;
        cy.editar_produto(token, productId).then((response) =>{
            expect(response.status).to.equal(200);
            });
        });
    });

    it('Listar produtos cadastrados após editar', () =>{
        cy.listar_produtos_cadastrados();
    });

    after(() =>{
        cy.realizar_login_retornar_token().then((token) => {
            expect(token).to.not.be.empty;
        cy.deletar_todos_produtos(token);
        });
    });
});