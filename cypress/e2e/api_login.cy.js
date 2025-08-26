/// <reference types="Cypress"/>

describe('API - Teste funcional login', () => {

    it('Realizar login com sucesso', () => {
        cy.login('fulano@qa.com', 'teste').then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
        })
        
    });

    it('Realizar login com senha inválida', () => {
        cy.login('fulano@qa.com', 'test').then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });

    it('Realizar login com e-mail inválido', () => {
        cy.login('fulanoqa.com', 'test').then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.email).to.equal('email deve ser um email válido')
        })
    });

    it('Realizar login com e-mail inexistente', () => {
        cy.login('batatinha@qa.com', 'test').then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });

});