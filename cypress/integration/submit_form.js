/// <reference types="cypress" />

context('Form Submission', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('visiting the search', () => {

    it('can type in the text box', () => {
      cy.get('input[name=search]').type('maths')
        .should('have.value', 'maths')

      cy.get('#course-search-form').submit()
      cy.url().should('include', 'level=undergraduate')
    })

  });
})
