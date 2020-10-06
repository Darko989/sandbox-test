describe("Check login api response", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const request = {
    url: "/api/users/login",
    method: "POST",
    failOnStatusCode: false,
    followRedirect: false,
    body: {
      email: email,
      password: password,
    }
  };

  const pattern = `{
        "refreshToken": String,
        "success": true,
        "token": String
  }`;

  it("Check api valid Login", () => {
    cy.checkIfJsonAndStatus(request, 200);
  });
});
