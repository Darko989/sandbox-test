describe("Check password change validation check", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  const email = Cypress.env("email");
  const password = Cypress.env("password");

  //Password check empty fields
  it("Check password change validation check empty fields within the app", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.get(
      "[data-testid=profile_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("a > [data-testid=submit_btn]").click();
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should(
      "contain",
      "Current password is required"
    );
    cy.get(".invalid-feedback").should("contain", "New password is required");
    cy.get(".invalid-feedback").should(
      "contain",
      "Confirm password is required"
    );
  });

  //Password check confirm password
  it.only("Check password change validation check confirm passwrod", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.get(
      "[data-testid=profile_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("a > [data-testid=submit_btn]").click();
    cy.get(":nth-child(1) > .value").type(password);
    cy.get(":nth-child(2) > .value").type("123456");
    cy.get(":nth-child(3) > .value").type("1234567");
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should(
      "contain",
      "Confirm password must match password"
    );
  });

  //Check current password validation
  it("Check current password validation", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.get(
      "[data-testid=profile_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("a > [data-testid=submit_btn]").click();
    cy.get(":nth-child(1) > .value").type("testingQA");
    cy.get(":nth-child(2) > .value").type("loremIpsum");
    cy.get(":nth-child(3) > .value").type("loremIpsum");
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should("contain", "Incorrect current password");
  });

  //Successfully changing the password
  it("Succesfully changing the password", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.get(
      "[data-testid=profile_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("a > [data-testid=submit_btn]").click();
    cy.get(":nth-child(1) > .value").type(password);
    cy.get(":nth-child(2) > .value").type("loremIpsum");
    cy.get(":nth-child(3) > .value").type("loremIpsum");
    cy.get("[data-testid=submit_btn]").click();
    cy.url().should("include", "/profile");
    cy.get(".Toastify__toast").should(
      "contain",
      "Password successfully changed"
    );
  });
});
