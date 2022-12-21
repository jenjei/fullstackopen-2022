describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
        name: 'Jenni',
        username: 'jenniaylis',
        password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.get('input:first').type('jenniaylis') // with #username -> Timed out retrying after 4000ms: Expected to find element: #username, but never found it.
        cy.get('input:last').type('salainen')
        cy.contains('login').click()
    
        cy.contains('Jenni logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('input:first').type('mluukkai')
        cy.get('input:last').type('salainen')
        cy.contains('login').click()
    
        cy.contains('wrong username or password')
        // TODO LATER bonus exercise: Check that the notification shown with unsuccessful login is displayed red.
    })
  })
})