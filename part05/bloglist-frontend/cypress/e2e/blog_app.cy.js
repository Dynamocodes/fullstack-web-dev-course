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
    cy.get('html').should('not.contain', 'Elias Hietanen logged in')

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('ehietane')
      cy.get('#password').type('password')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function() {
      cy.contains('blogs')
      cy.get('#toggleOpen').click()
      cy.get('#titleInput').type('new title')
      cy.get('#authorInput').type('Elias Hietanen')
      cy.get('#urlInput').type('www.void.com')
      cy.get('#createBlogButton').click()
      cy.get('.addNotification').should('contain', 'a new blog new title by Elias Hietanen added!')
      cy.get('.addNotification').should('have.css', 'color', 'rgb(7, 154, 41)')
      cy.get('.shortenedBlog').should('contain', 'new title Elias Hietanen')
    })

    describe('When there is a blog in the database', function() {
      beforeEach(function() {
        cy.get('#toggleOpen').click()
        cy.get('#titleInput').type('new title')
        cy.get('#authorInput').type('Elias Hietanen')
        cy.get('#urlInput').type('www.void.com')
        cy.get('#createBlogButton').click()
      })

      it('A blog can be liked', function(){
        cy.contains('blogs')
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })
    })
  })
})