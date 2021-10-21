/// <reference types="cypress" />

it('Stubbing response', () => {

  cy.intercept('http://localhost:3000/api/boards', { fixture: 'boards.json' }).as('fakeBoard')

  cy.visit('/')
});

it('Dynamically change parts of the response data', () => {

  cy.intercept({
    method: 'GET',
    url: 'http://localhost:3000/api/boards'
  }, (req) => {
    req.reply((res) => {
      res.body[0].starred = false
      res.body[1].name = 'Something else'

      return res
    })
  
  })
  cy.visit('/');
  // cy.get('div[data-id="board_51658829152"]').should('contains', 'novi boardd')
});

it('Kreiranje boarda', () => {
  cy.request('POST', '/api/boards', {
      statusCode: 201,
      name: 'A board',
  })

  cy.visit('/');
});   

it('Brisanje boarda', () => {
  cy.request('DELETE', '/api/boards/4319130592', {
    })

  cy.visit('/');
})