/// <reference types="Cypress"/>

describe('Validar fluxo de produtos', () =>{
    let productId

    it('Cadastrar produto', () =>{
        cy.login_token_adm().then((token) => {
        expect(token).to.not.be.empty;
        cy.cadastrar_produto_aleatorio(token).then((response) =>{
        expect(response.status).to.equal(201)
        productId = response.body._id
        cy.log(`Produto cadastrado no id: ${productId}`)
            });
        });
    });

    it('Cadastrar produto já existente', () =>{
        cy.login_token_adm().then((token) => {
        expect(token).to.not.be.empty;
        cy.cadastrar_produto(token, 'Logitech MX Vertical').then((response) =>{
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal('Já existe produto com esse nome')
            });
        });
    });

    it('Cadastrar produto sem token', () =>{
        cy.cadastrar_produto_aleatorio('token').then((response) =>{
        expect(response.status).to.equal(401)
        expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        });
    });

    it('Cadastrar produto sem autorização', () =>{
        cy.login_token_nao_adm().then((token) => {
        expect(token).to.not.be.empty;
        cy.cadastrar_produto_aleatorio(token).then((response) =>{
        expect(response.status).to.equal(403)
        expect(response.body.message).to.equal('Rota exclusiva para administradores')
            });
        });
    });
    

    it('Listar produto por id', () =>{
        cy.listar_produto_id(productId).then((response) =>{
            expect(response.status).to.equal(200);
        });
    });

    it('Listar produto por id inexistente', () =>{
        cy.listar_produto_id('BeeJh5lz3k6kSIzW').then((response) =>{
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Produto não encontrado');
        });
    });

    it('Listar produtos cadastrados antes de editar', () =>{
        cy.listar_produtos_cadastrados();
    });

    it('Editar produto cadastrado', () =>{
        cy.login_token_adm().then((token) => {
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
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
        cy.deletar_produtos(token);
        });
    });
});