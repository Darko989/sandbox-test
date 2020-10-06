
describe("Check login api profile response", () => {
    
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    beforeEach(() => {
        cy.loginForToken(email, password);
      });
    
  const bearerToken = localStorage.getItem("token");
  const request = {
    auth: {
        bearer: bearerToken, 
    },
    url: "/api/profile",
    method: "GET",
    failOnStatusCode: false,
    followRedirect: false,
    body: {
      email: email,
      password: password,
    },
  };

  const pattern = `{
        "user_id": Number,
        "password": String, 
        "full_name": String,
        "email": String,
        "created_on": dateString,
        "last_login": dateString,
        "avatar": String,
        "role": String,
        "activated": Boolean,
        "registration_hash": null,
        "scenario_id": Number,
        "cv":null,
        "status":null,
        "office":Number,
        "profile":{
            "profile_id": Number,
            "user_id": Number,
            "username": String,
            "location": String,
            "github": String,
            "bio": String,
            "status": String
         }
  }`;

  it("Check api valid profile", () => {
    cy.checkProfileApi(request, 200, pattern);
  });
});
