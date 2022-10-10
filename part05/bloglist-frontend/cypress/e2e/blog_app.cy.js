describe('Blog app', function() {

  beforeEach(( ) => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Elias Hietanen',
      username: 'ehietane',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#loginButton')
  })

  it('user can login', function() {
    cy.contains('Log in to application')
    cy.get('#username').type('ehietane')
    cy.get('#password').type('password')
    cy.get('#loginButton').click()
    cy.contains('blogs')
    cy.contains('Elias Hietanen logged in')
    cy.get('#logoutButton')
  })

  it('user can\'t login', function() {
    cy.contains('Log in to application')
    cy.get('#username').type('dynamo')
    cy.get('#password').type('password')
    cy.get('#loginButton').click()
    cy.contains('Log in to application')
    cy.contains('Wrong credentials')
    cy.get('#notification')
      .should('include.text', 'Wrong credentials')
      .and('have.css', 'color')
      .should('include', 'rgb(255, 0, 0)')
    cy.get('#loginButton')
  })
})