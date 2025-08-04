/// <reference types="Cypress"/>

describe('Validar fluxo cadastro de usuário', () => {
    let usuarioId;
    const usuarioId2 = Math.floor(Math.random() * 10000);

    it("Realizar cadastro de usuario", () => {
        cy.cadastro_usuario_aleatorio('Wellington','well','teste','true').then((response)=>{
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
            usuarioId = response.body._id;
            cy.log(`Usuário criado com ID: ${usuarioId}`);
        });
    });

    it("Buscar usuario por id", () => {
       cy.buscar_usuario_id(usuarioId).then((response)=>{
            expect(response.status).to.equal(200);
        });
    });

    it("Listar usuarios cadastrados antes de editar", () => {
       cy.listar_usuarios_cadastrados();
    });

    it("Editar usuario", () => {
       cy.editar_usuario('Alterado','alt','alter','false',usuarioId).then((response)=>{
            expect(response.status).to.equal(200);
        });
    });

    it("Editar usuario inexistente", () => {
       cy.editar_usuario('AlterarInexistente','inexistente','alter','false',usuarioId2).then((response)=>{
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
            cy.log(response.body._id);
        });
    });

    it("Listar usuarios cadastrados antes de deletar", () => {
       cy.listar_usuarios_cadastrados();
    });

    it("Deletar usuario", () => {
        cy.deletar_usuario(usuarioId).then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
    });

    it("Listar usuarios cadastrados após deletar", () => {
       cy.listar_usuarios_cadastrados();
    });

    it("Cadastrar usuario com e-mail existente", () => {
       cy.cadastro_usuario('Fulano da Silva', 'fulano@qa.com', 'teste', 'true').then((response)=>{
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Este email já está sendo usado');
        });
    });

    it("Deletar usuario com carrinho cadastrado", () => {
        cy.deletar_usuario('0uxuPY0cbmQhpEz1').then((response)=>{
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Não é permitido excluir usuário com carrinho cadastrado');
        });
    });

     after(() => {
        cy.deletar_todos_usuarios()
      });
});