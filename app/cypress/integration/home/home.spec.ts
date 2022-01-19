/// <reference types="cypress" />

describe("Home page", () => {
  it("can load the home page", () => {
    cy.visit("/");
    cy.contains("Nearby Taxis");
  });

  it("welcome modal should show if there is no geolocation data", () => {
    cy.wait(2000);
    cy.get(".welcome-modal").contains("Welcome to Hail a Ride");
  });

  it("welcome modal should close on click button click", () => {
    cy.get(".welcome-modal button").click();
    cy.get(".welcome-modal").should("not.exist");
  });

  it("home page with geolocation and nearby taxi data loads", () => {
    const londonOffice = {
      latitude: 51.5049375,
      longitude: -0.0964509
    };

    const singaporeOffice = {
      latitude: 1.285194,
      longitude: 103.8522982
    };

    let userGeolocation;

    cy.fixture("home/user-geolocation.json").then(fixture => {
      userGeolocation = fixture;
    });
    cy.intercept("GET", `http://localhost:4000/taxis-nearby?latitude=${londonOffice.latitude}&longitude=${londonOffice.longitude}*`, { fixture: "home/nearby-taxis-london.json" }).as("nearbyTaxisDataLondon");
    cy.intercept("GET", `http://localhost:4000/taxis-nearby?latitude=${singaporeOffice.latitude}&longitude=${singaporeOffice.longitude}*`, { fixture: "home/nearby-taxis-singapore.json" }).as("nearbyTaxisDataSingapore");

    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(cb => {
          return cb({ coords: userGeolocation });
        });
      }
    });
    cy.contains("Nearby Taxis");
    cy.get(".welcome-modal").should("not.exist");
    cy.get(".loading-ui").should("exist");
    cy.wait([ "@nearbyTaxisDataLondon" ]);
    cy.get(".loading-ui").should("not.exist");
  });

  it("map should show London office map marker", () => {
    cy.get(".selected-office-marker.london-office").should("exist");
  });

  it("map should show Singapore office map marker on office change", () => {
    cy.get(".office-select").click();
    cy.get(".select-option-singapore").click();
    cy.wait([ "@nearbyTaxisDataSingapore" ]);
    cy.get(".selected-office-marker.singapore-office").should("exist");
    cy.get(".selected-office-marker.london-office").should("not.exist");
  });

  // it("can recenter map to nearest office (London)", () => {
  //   cy.get(".nearest-office-recenter").click();
  //   cy.get(".selected-office-marker.london-office").should("exist");
  //   cy.get(".selected-office-marker.singapore-office").should("not.exist");
  // });
});
