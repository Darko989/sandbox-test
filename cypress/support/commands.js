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


Cypress.Commands.add("login", (email, pass) => {
    cy.visit("/login");
    cy.get(':nth-child(1) > .value').type(email);
    cy.get(':nth-child(2) > .value').type(password);
    cy.get("button[type='submit']").click();
});

Cypress.Commands.add("loginByCSRF", (email, password, csrfToken) => {
    cy.request({
        method: "POST",
        url: "/login",
        form: true,
        followRedirect: true,
        body: {
            ':nth-child(1) > .value': email,
            ':nth-child(2) > .value': pass,
            "form[_token]": csrfToken
        }
    });
});