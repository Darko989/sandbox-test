describe("Verify reports and create test use case", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  const email = Cypress.env("email");
  const password = Cypress.env("password");

  //Validation check
  it("Check reports validation", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.get(
      "[data-testid=reports_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("[data-testid=report_issue_btn]").click();
    cy.get("[data-testid=submit_btn]").click();
    cy.get(".invalid-feedback").should("contain", "Summary is required");
    cy.get(".invalid-feedback").should(
      "contain",
      "Type of the issue is required"
    );
    cy.get(".invalid-feedback").should(
      "contain",
      "Severity of the issue is required"
    );
    cy.get(".invalid-feedback").should(
      "contain",
      "Priority of the issue is required"
    );
  });

  //Succesfully creating and deleting test bug report
  it("Succesfully creating and deleting test bug report", () => {
    cy.get(":nth-child(1) > .value").type(email);
    cy.get(":nth-child(2) > .value").type(password);
    cy.get("button[type='submit']").click();
    cy.get(
      "[data-testid=reports_card_id] > :nth-child(1) > a > .card > .card-body > :nth-child(3) > .card-success"
    ).click();
    cy.get("[data-testid=report_issue_btn]").click();
    cy.get(":nth-child(3) > .value").type("Test bug report");
    cy.get(":nth-child(4) > .form-control").select("Task");
    cy.get(":nth-child(5) > .form-control").select("Critical");
    cy.get(":nth-child(6) > .form-control").select("Blocker");
    cy.get("[data-testid=submit_btn]").click();
    cy.get("a.list-group-item.list-group-item-action").first().click();
    cy.get("[data-testid=remove_report_btn]").click();
    cy.get("p > :nth-child(2) > .btn").click();
    cy.url().should("include", "/reports");
  });
});
