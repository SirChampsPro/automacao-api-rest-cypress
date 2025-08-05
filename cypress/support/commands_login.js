Cypress.Commands.add('realizar_login', (user, password)=>{
     cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": user,
                "password": password
            },
            failOnStatusCode: false
        });
});

Cypress.Commands.add('realizar_login_retornar_token', ()=>{
    return cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: {
        email: 'fulano@qa.com',
        password: 'teste'
        }
  }).then((response) => {
    const token = response.body.authorization;
    return token;
  });
});
