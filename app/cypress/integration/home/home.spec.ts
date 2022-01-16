/// <reference types="cypress" />

describe("Home page", () => {
  it("can load the home page", () => {
    cy.visit("/");
    cy.contains("Nearby Taxis");
  });
});
