describe("Check bad request login for empty password", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("");
  const request = {
    url: "/api/users/login",
    method: "POST",
    failOnStatusCode: false,
    followRedirect: false,
    body: {
      email: email,
    },
  };

  it("Check bad request login empty password", () => {
    cy.checkBadRequestPassword(request, 400);
  });

  describe("Check bad request login for empty password", () => {
    const email = Cypress.env("");
    const password = Cypress.env("password");
    const request = {
      url: "/api/users/login",
      method: "POST",
      failOnStatusCode: false,
      followRedirect: false,
      body: {
        password: password,
      },
    };

    it("Check bad request login empty email", () => {
      cy.checkBadRequestEmail(request, 400);
    });
  });
});
