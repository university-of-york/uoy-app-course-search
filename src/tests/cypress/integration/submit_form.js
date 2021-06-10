/// <reference types="cypress" />
const { applicationBasePath } = require("../../../constants/basePath");

context("Form Submission", () => {
    beforeEach(() => {
        cy.visit(applicationBasePath);
    });

    describe("visiting the search", () => {
        it("submits a level parameter when searching", () => {
            cy.get("input[name=search]").type("maths").should("have.value", "maths");

            cy.get("#course-search-form").submit();
            cy.url().should("include", "level=undergraduate");
        });
    });
});
