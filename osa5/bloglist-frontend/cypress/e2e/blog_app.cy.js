describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  it('user can log in', function() {
    cy.get('#username').type('jenniaylis') // Timed out retrying after 4000ms: Expected to find element: #username, but never found it.
    cy.get('#password').type('asdf1234')
    cy.contains('login').click()

    cy.contains('Jenni logged in')
  })
})