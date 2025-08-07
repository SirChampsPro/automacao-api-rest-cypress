Cypress.Commands.add('login', (user, password) => {
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

Cypress.Commands.add('login_token_adm', () => {
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

Cypress.Commands.add('login_token_novo_adm', () => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: {
      email: 'well@champs.com.br',
      password: 'ChampsLTDA'
    }
  }).then((response) => {
    const token = response.body.authorization;
    return token;
  });

});

Cypress.Commands.add('login_token_nao_adm', () => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: {
      email: 'sabrininhak+@brabeza.com.br',
      password: 'SabrininhaK+'
    }
  }).then((response) => {
    const token = response.body.authorization;
    return token;
  });

});