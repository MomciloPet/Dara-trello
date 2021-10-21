/// <reference types="cypress" />
import trelloItems from "../fixtures/trelloItems.json"

describe('Creating a custom command', () => {
  before(() => {
    cy.intercept('**/api/boards', { fixture: 'boards.json' ,statusCode: 201}).as('fakeBoards')
    cy.visit('/');
  })

  it('Should show all boards correctly', () => {
    cy.get(trelloItems.board)
      .eq(0)
      .find('.board_item > .board_title')
      .should('have.text', 'In progress')

    cy.wait('@fakeBoards').then((req) => {
      expect(req.response.statusCode).to.eq(201)
      expect(req.response.body).to.be.a('array')
      const boards = req.response.body
      expect(boards[1].starred).to.be.true

    cy.get(trelloItems.board)
      .eq(1)
      .find('.board_item')
      .should('have.length', boards.length)

    cy.get(trelloItems.singleBoard)
      .eq(0)
      .should('have.text', `${boards[0].name} `)
      .should('be.visible')

    cy.get(trelloItems.singleBoard)
      .eq(1)
      .should('have.text', `${boards[1].name} `)
      .should('be.visible')

    cy.get(trelloItems.singleBoard)
      .eq(2)
      .should('have.text', `${boards[2].name} `)
      .should('be.visible')

    cy.get(trelloItems.singleBoard)
      .eq(3)
      .should('have.text', `${boards[3].name} `)
      .should('be.visible')
    })
       
  });
});