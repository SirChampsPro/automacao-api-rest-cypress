/// <reference types="Cypress"/>

describe('Validar fluxo de produtos', () => {
    let productId

    it('Cadastrar produto', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.cadastrar_produto_aleatorio(token).then((response) => {
                expect(response.status).to.equal(201)
                productId = response.body._id
                cy.log(`Produto cadastrado no id: ${productId}`)
            });
        });
    });

    it('Cadastrar produto já existente', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.cadastrar_produto(token, 'Logitech MX Vertical').then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            });
        });
    });

    it('Cadastrar produto sem token', () => {
        cy.cadastrar_produto_aleatorio('token').then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        });
    });

    it('Cadastrar produto sem autorização', () => {
        cy.verifica_usuarioComum_existe();
        cy.login_token_nao_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.cadastrar_produto_aleatorio(token).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body.message).to.equal('Rota exclusiva para administradores')
            });
        });
    });


    it('Listar produto por id', () => {
        cy.listar_produto_id(productId).then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    it('Listar produto por id inexistente', () => {
        cy.listar_produto_id('BeeJh5lz3k6kSIzW').then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Produto não encontrado');
        });
    });

    it('Listar produtos cadastrados antes de editar', () => {
        cy.listar_produtos_cadastrados();
    });

    it('Editar produto cadastrado', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.editar_produto(token, productId).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            });
        });
    });

    it('Editar produto inexistente', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.editar_produto(token, 'JW4DuiwaCM8dFDDD').then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                cy.log(`Produto cadastrado no id: ${response.body._id}`)
            });
        });
    });

    it('Editar produto com nome repetido', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.editar_produto_nome_repetido(token, productId).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            });
        });
    });

    it('Editar produto token ausente', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.editar_produto('token', productId).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            });
        });
    });

    it('Editar produto usuario comum', () => {
        cy.login_token_nao_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.editar_produto(token, productId).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal('Rota exclusiva para administradores')
            });
        });
    });

    it('Listar produtos cadastrados após editar', () => {
        cy.listar_produtos_cadastrados();
    });

    it('Deletar Produto', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.cadastrar_produto_aleatorio(token).then((response) => {
                expect(response.status).to.equal(201)
                const productId = response.body._id
                cy.log(`Produto cadastrado no id: ${productId}`)
                cy.deletar_produto(token, productId).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro excluído com sucesso');
                });
            });
        });
    });

    it('Deletar produto atrelado a carrinho', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.deletar_produto(token, 'BeeJh5lz3k6kSIzA').then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('Não é permitido excluir produto que faz parte de carrinho');
            });
        });
    });

    it('Deletar Produto', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.cadastrar_produto_aleatorio(token).then((response) => {
                expect(response.status).to.equal(201)
                const productId = response.body._id
                cy.log(`Produto cadastrado no id: ${productId}`)
                cy.deletar_produto(token, productId).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro excluído com sucesso');
                });
            });
        });
    });

    it('Deletar produto token ausente', () => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.cadastrar_produto_aleatorio(token).then((response) => {
                expect(response.status).to.equal(201)
                const productId = response.body._id
                cy.log(`Produto cadastrado no id: ${productId}`)
                cy.deletar_produto('token', productId).then((response) => {
                    expect(response.status).to.equal(401);
                    expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
                });
            });
        });
    });

    it('Deletar produto usuario comum', () => {
        cy.login_token_nao_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.deletar_produto(token, productId).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal('Rota exclusiva para administradores');

            });
        });
    });

    after(() => {
        cy.login_token_adm().then((token) => {
            expect(token).to.not.be.empty;
            cy.deletar_produtos(token);
        });
    });
});