// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import chaiJsonPattern from "chai-json-pattern";

chai.use(chaiJsonPattern);

Cypress.Commands.add("checkIfJsonAndStatus", (request, status) => {
  cy.request(request).then((response) => {
    expect(response.headers).to.have.property(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(response.status).to.equal(status);
    expect(response.body).to.matchPattern(`{
                "success": Boolean, 
                "token": String,
                "refreshToken": String
              }`);
  });
});
Cypress.Commands.add("checkProfileApi", (request, status, pattern) => {
  cy.request(request).then((response) => {
    expect(response.headers).to.have.property(
        "content-type",
        "application/json; charset=utf-8"
    );
    expect(response.status).to.equal(status);
    expect(response.body).to.matchPattern(pattern);
  });
});

Cypress.Commands.add("checkBadRequestPassword", (request, status) => {
  cy.request(request).then((response) => {
    expect(response.headers).to.have.property(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(response.status).to.equal(status);
    expect(response.body).to.matchPattern(`{
                    "password": String,
                }`);
  });
});

Cypress.Commands.add("checkBadRequestEmail", (request, status) => {
  cy.request(request).then((response) => {
    expect(response.headers).to.have.property(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(response.status).to.equal(status);
    expect(response.body).to.matchPattern(`{
                    "email": String,
                }`);
  });
});

Cypress.Commands.add('loginForToken', (email,password) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env("publicApiEnv")}/api/users/login`,
      body: {
          email: email,
          password: password
      }
    })
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('refreshToken', response.body.refreshToken);
      });
  });

Cypress.Commands.add("checkForgotPasswordSent", (request, status) => {
  cy.request(request).then((response) => {
    expect(response.headers).to.have.property(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(response.status).to.equal(status);
    expect(response.body).to.matchPattern(`{
                    "success": String,
                }`);
  });
});
