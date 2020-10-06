describe("Check reset pass api response", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const request = {
    url: "/api/mailer/password-reset",
    method: "POST",
    failOnStatusCode: false,
    followRedirect: false,
    body: {
      email: email,
      password: password,
    },
  };

  it("Check reset pass", () => {
    cy.checkForgotPasswordSent(request, 200);
  });
});
