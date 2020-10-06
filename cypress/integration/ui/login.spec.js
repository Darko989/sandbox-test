describe("Login test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  const email = Cypress.env("email");
  const password = Cypress.env("password");

  //Login page
  it("greets with Log in", () => {
    cy.contains("a.navbar-brand.noselect", "QA Sandbox");
    cy.contains("h1.display-4.text-center", "Log In");
    cy.contains(":nth-child(1) > .nav-link", "Forgot Password");
    cy.contains(":nth-child(2) > .nav-link", "Login");
  });

  //Check Forgot password link, empty email and valid email
  it("check Forget password", () => {
    cy.get(":nth-child(1) > .nav-link").should("contain", "Forgot Password");
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get(".col-xl-12 > :nth-child(3)").should(
      "contain",
      "* = required field"
    );
    cy.get(".value").should("have.css", "position", "relative");
    cy.get(".form-group > .form-text").should(
      "contain",
      "Enter your email address and we will send you instructions to reset your password."
    );
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should("contain", "Email field is required");
    cy.get(".value").type(email + "{enter}");
    cy.url().should("include", "/login");
    cy.get(".Toastify__toast").should("contain", "Email successfully sent");
  });

  //Check empty email, valid password
  it("requires email", () => {
    cy.get("form input[type = email]").should(
      "have.css",
      "position",
      "relative"
    );
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type ='submit']").click();
    cy.get(".invalid-feedback").should("contain", "Email field is required");
    cy.url().should("include", "/login");
  });

  //Check empty password, valid email
  it("requires password", () => {
    cy.get(":nth-child(2) > .value").should("have.css", "position", "relative");
    cy.get(":nth-child(1) > .value").type(email + "{enter}");
    cy.get(".invalid-feedback").should("contain", "Password is required");
    cy.url().should("include", "/login");
  });

  //Check valid username, invalid password
  it("requires valid username and invalid password", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type("INVALIDpassword{enter}");
    cy.get(".invalid-feedback").should("contain", "Password incorrect");
    cy.url().should("include", "/login");
  });

  //Check invalid user, valid password
  it("requires invalid username and valid password", () => {
    cy.get(":nth-child(1) > .value").type(email + "{m}");
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should("contain", "User not found");
    cy.url().should("include", "/login");
  });

  //Check password is more than 6 characters
  it("requires password is more than 6 characters", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type("INV{enter}");
    cy.get(".invalid-feedback").contains(
      "Password must be at least 6 characters long"
    );
    cy.url().should("include", "/login");
  });

  //Sucessfull login and logout
  it("sucessfull login and logout", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.get(":nth-child(4) > .nav-link").click();
    cy.url().should("include", "/");
  });
});
