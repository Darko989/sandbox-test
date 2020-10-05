describe("Verify use case and create test use case", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  const email = Cypress.env("email");
  const password = Cypress.env("password");

  //Check use case validation
  it("Check use case validation", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.get(
      "[data-testid=use_cases_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("[data-testid=create_use_case_btn]").click();
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should("contain", "Title is required");
    cy.get(".invalid-feedback").should(
      "contain",
      "Expected result is required"
    );
    cy.get(".invalid-feedback").should(
      "contain",
      "There must be at least one test step"
    );
  });

  //Check character validation
  it("Check use case validation for characters", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.get(
      "[data-testid=use_cases_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("[data-testid=create_use_case_btn]").click();
    cy.get(":nth-child(3) > .value").type("Test");
    cy.get(":nth-child(5) > .value").type("Test");
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should(
      "contain",
      "Title needs to be between 5 and 255"
    );
    cy.get(".invalid-feedback").should(
      "contain",
      "Expected results needs to be between 5 and 255"
    );
  });

  //Creating test use case and deleting from the list
  it("Creating test use case and deleting from the list", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.get(
      "[data-testid=use_cases_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("[data-testid=create_use_case_btn]").click();
    cy.get(":nth-child(3) > .value").type("Test use case");
    cy.get(":nth-child(5) > .value").type("Test use case");
    cy.get("#stepId").type("Test use case");
    cy.get("[data-testid=submit_btn]").click();
    cy.url().should("include", "/use-cases");
    cy.get("a.list-group-item.list-group-item-action").first().click();
    cy.get("[data-testid=remove_usecase_btn]").click();
    cy.get(":nth-child(2) > .btn").click();
    cy.url().should("include", "/use-cases");
  });
});
