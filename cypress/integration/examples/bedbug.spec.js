/// <reference types="Cypress" />

context('Aliasing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/bedbug')
  })

  it('.as() - alias a route for later use', () => {

    // Alias the route to wait for its response
    cy.server()
    cy.route('GET', 'comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click()

    cy.wait('@getComment').its('status').should('eq', 200)
    cy.get('.network-comment').should('contain', 'dolor')

  })

  it('doesnt fail when error is injected because of poor test design', () => {
    // now let's bedbug this mother
    cy.server()

    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'comments/*',    // that have a URL that matches '/users/*'
      status: 412,
    }).as('getBadComment')

    cy.get('.network-btn').click()

    cy.wait('@getBadComment').its('status').should('eq', 200)
    // cy.get('.network-comment').should('contain', 'dolor')
  })

  it('should fail when error is injected', () => {
    // now let's bedbug this mother
    cy.server()

    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'comments/*',    // that have a URL that matches '/users/*'
      status: 200,
      response: {
        body: "this is a nasty rude message that should never have been posted here"
      }
    }).as('getBadComment')

    cy.get('.network-btn').click()

    cy.wait('@getBadComment').its('status').should('eq', 200)
    cy.get('.network-comment').should('contain', 'dolor')
  })

})
