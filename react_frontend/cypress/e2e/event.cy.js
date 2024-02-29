describe("Event Creation and Management Tests", () => {
  Cypress.on("fail", (err, runnable) => {
      cy.log(err.message);
      return false;
  });

  it("should allow a user to create an event", () => {
      // Besuche die Homepage
      cy.visit("http://localhost:3000/");

      // Klicke auf den "Get Started"-Button
      cy.contains("Get Started").click();

      // Überprüfe, ob man auf der Loginseite ist
      cy.url().should("eq", "http://localhost:3000/login");

      // Gib die Benutzerdaten für den Benutzer ein
      cy.get("#email").type("admin@example.com");
      cy.get("#password").type("1234");

      // Klicke auf den Sign-In-Button
      cy.contains("Sign in").click();

      // Überprüfe, ob die Anmeldung erfolgreich war und man auf der Homepage ist
      cy.url().should("eq", "http://localhost:3000/main");

      // Klicke auf den Button "Events"
      cy.contains("Events").click();

      // Überprüfe, ob man auf der Seite zum Erstellen eines neuen Events ist
      cy.url().should("eq", "http://localhost:3000/event");

      // Klicke auf den Button "Add"
      cy.contains("Add").click();

      // Fülle die Felder aus und klicke auf den "Create Event"-Button
      cy.get('#name').click().type("Name");
      cy.get('#date').click().type("01.02.2023"); // Datum im richtigen Format
      cy.get('#location').type("Berlin");
      cy.get('#description').type("Beschreibung für mein erstes Event");

      // Klicke auf den "Create Event"-Button
      cy.contains("Create").click();

      // Überprüfe, ob die Erstellung erfolgreich war und man zurück auf der Homepage ist
      cy.url().should("eq", "http://localhost:3000/event/");

      // Überprüfe, ob das Event in der Liste der Events erscheint
      cy.contains("Name").should("exist");
  });
});

describe("Event Creation and Management Tests", () => {
  Cypress.on("fail", (err, runnable) => {
      cy.log(err.message);
      return false;
  });

  it("should allow a user to create an event", () => {
      // Besuche die Homepage
      cy.visit("http://localhost:3000/");

      // Klicke auf den "Get Started"-Button
      cy.contains("Get Started").click();

      // Überprüfe, ob man auf der Loginseite ist
      cy.url().should("eq", "http://localhost:3000/login");

      // Gib die Benutzerdaten für den Benutzer ein
      cy.get("#email").type("user@example.com");
      cy.get("#password").type("1234");

      // Klicke auf den Sign-In-Button
      cy.contains("Sign in").click();

      // Überprüfe, ob die Anmeldung erfolgreich war und man auf der Homepage ist
      cy.url().should("eq", "http://localhost:3000/main");

      // Klicke auf den Button "Events"
      cy.contains("Events").click();

      // Überprüfe, ob man auf der Seite zum Erstellen eines neuen Events ist
      cy.url().should("eq", "http://localhost:3000/event/add");

      // Klicke auf den Button "Add"
      cy.contains("Add").click();

      // Fülle die Felder aus und klicke auf den "Create Event"-Button
      cy.get('#name').click().type("Name");
      cy.get('#date').click().type("01.02.2023"); // Datum im richtigen Format
      cy.get('#location').type("Berlin");
      cy.get('#description').type("Beschreibung für mein erstes Event");

      // Klicke auf den "Create Event"-Button
      cy.contains("Create").click();

      // Überprüfe, ob die Erstellung erfolgreich war und man zurück auf der Homepage ist
      cy.url().should("eq", "http://localhost:3000/event/");

      // Überprüfe, ob das Event in der Liste der Events erscheint
      cy.contains("Name").should("exist");
  });
});
