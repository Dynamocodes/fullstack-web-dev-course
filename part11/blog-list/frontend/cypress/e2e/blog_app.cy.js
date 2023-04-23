describe('Blog app', function() {

  beforeEach(( ) => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Elias Hietanen',
      username: 'ehietane',
      password: 'password'
    }
    const user2 = {
      name: 'Elien Hietanas',
      username: 'dynamo',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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
    cy.get('#username').type('ehietane')
    cy.get('#password').type('wrong')
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
      cy.login({ username: 'ehietane', password: 'password' })
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

    it('user can logout', function(){
      cy.contains('blogs')
      cy.get('#logoutButton').click()
      cy.loginFormIsShown()
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

      it('A blog can be deleted by the user who created it', function(){
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'new title Elias Hietanen')
      })

      it('A blog can\'t be deleted by another user', function(){
        cy.get('#logoutButton').click()
        cy.login({ username: 'dynamo', password: 'password' })
        cy.contains('view').click()
        cy.get('.removeButton').should('not.exist')
      })
    })

    describe('When there are several blogs in the database', function() {
      beforeEach(function() {
        cy.get('#toggleOpen').click()
        cy.get('#titleInput').type('first blog')
        cy.get('#authorInput').type('Elias Hietanen')
        cy.get('#urlInput').type('www.void.com')
        cy.get('#createBlogButton').click()
        cy.get('#toggleOpen').click()
        cy.get('#titleInput').type('second blog')
        cy.get('#authorInput').type('Elias Hietanen')
        cy.get('#urlInput').type('www.void.com')
        cy.get('#createBlogButton').click()
      })

      it('The blog are ordered by the amount of likes they have', function(){
        cy.contains('view').click()
        cy.contains('view').click()
        cy.get('.detailedBlog').eq(0).should('contain', 'first blog Elias Hietanen')
        cy.get('.detailedBlog').eq(0).should('contain', 'likes 0')
        cy.get('.detailedBlog').eq(1).should('contain', 'second blog Elias Hietanen')
        cy.get('.detailedBlog').eq(1).should('contain', 'likes 0')
        cy.get('.like').eq(1).click()
        cy.get('.detailedBlog').eq(0).should('contain', 'second blog Elias Hietanen')
        cy.get('.detailedBlog').eq(0).should('contain', 'likes 1')
        cy.get('.detailedBlog').eq(1).should('contain', 'first blog Elias Hietanen')
        cy.get('.detailedBlog').eq(1).should('contain', 'likes 0')
        cy.get('.like').eq(1).click()
        cy.get('.like').eq(1).click()
        cy.get('.detailedBlog').eq(0).should('contain', 'first blog Elias Hietanen')
        cy.get('.detailedBlog').eq(0).should('contain', 'likes 2')
        cy.get('.detailedBlog').eq(1).should('contain', 'second blog Elias Hietanen')
        cy.get('.detailedBlog').eq(1).should('contain', 'likes 1')
      })
    })
  })
})