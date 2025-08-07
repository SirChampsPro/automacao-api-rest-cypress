Cypress.Commands.add('cadastro_usuario_aleatorio', (nome, email, password, isAdministrator)=>{
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000);

    cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body:{
                "nome": `${nome}${numeroAleatorio}`,
                "email": `${email}${timestamp}@qa.com.br`,
                "password": password,
                "administrador": isAdministrator
            }
        });
});

Cypress.Commands.add('cadastro_usuario', (nome, email, password, isAdministrator)=>{
    cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body:{
                "nome": nome,
                "email": email,
                "password": password,
                "administrador": isAdministrator
            },
            failOnStatusCode: false
        });
});

Cypress.Commands.add('listar_usuarios',()=>{
    cy.request({
            method: 'GET',
            url: 'http://localhost:3000/usuarios',
        });
});

Cypress.Commands.add('buscar_usuario_id',(idUser)=>{
    cy.request({
            method: 'GET',
            url: `http://localhost:3000/usuarios/${idUser}`,
        });
});

Cypress.Commands.add('editar_usuario',(nome, email, password, isAdministrator, idUser)=>{
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000);
    
    cy.request({
            method: 'PUT',
            url: `http://localhost:3000/usuarios/${idUser}`,
            body:{
                "nome": `${nome}${numeroAleatorio}`,
                "email": `${email}${timestamp}@qa.com.br`,
                "password": password,
                "administrador": isAdministrator
            },
            failOnStatusCode: false
        });
});

Cypress.Commands.add('deletar_usuario',(idUser)=>{
    cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/usuarios/${idUser}`,
            failOnStatusCode: false
        });
});

Cypress.Commands.add('deletar_todos_usuarios', (token) => {
  cy.request('GET', 'http://localhost:3000/usuarios').then((response) => {
    const usuarios = response.body.usuarios;

    if (usuarios.length <= 1) {
      cy.log('Não há usuários suficientes para deletar (mínimo 2).');
      return;
    }

    const idsParaPular = ['0uxuPY0cbmQhpEz1', '6Eiw4D280aP7GWM2', 'T0Aov5KVEfXEV3nX'];
    usuarios.forEach((usuario, index) => {
      if (idsParaPular.includes(usuario._id)) return;
      cy.request({
        method: 'DELETE',
        url: `http://localhost:3000/usuarios/${usuario._id}`,
        headers:{
            authorization: token
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
        cy.log(`Usuário deletado: ${usuario.nome} (index ${index + 1})`);
      });
    });
  });
});

Cypress.Commands.add('listar_usuarios_cadastrados', () =>{
    cy.request('GET', 'http://localhost:3000/usuarios').then((response) => {
    expect(response.status).to.equal(200);
    const usuarios = response.body.usuarios;
    cy.log(`Total de usuários encontrados: ${usuarios.length}`);
    usuarios.forEach((usuario, index) => {
      console.log(`Usuário ${index + 1}:`, usuario);
      cy.log(`Usuário ${index + 1}: ${usuario.nome} | ${usuario.email} | ${usuario._id} | ${usuario.administrador}`);
    });
  });
});