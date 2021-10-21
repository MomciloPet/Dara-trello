/// <reference types="cypress" />
import trelloItems from "../fixtures/trelloItems.json"

describe('Creating a custom command', () => {
  before(() => {
    cy.intercept('**/api/boards/9351772894', { fixture: 'board.json' ,statusCode: 200}).as('singleFakeBoard')
    cy.visit('/board/9351772894');
  })

  it('Should show list and tasks correctly', () => {
    cy.wait('@singleFakeBoard').then((req) => {
      expect(req.response.statusCode).to.eq(200)
      expect(req.response.body).to.be.a('object')
      expect(req.response.body.name).to.eq('In QA')
      const singleBoard = req.response.body

    cy.get(trelloItems.boardDetail)
      .eq(0)
      .find('.List')
      .should('have.length', singleBoard.lists.length)

    cy.get(trelloItems.singleList)
      .eq(0)
      .find('.Task')
      .should('have.length', singleBoard.tasks.length)

    cy.get(trelloItems.singleTask)
      .eq(0)
      .should('have.text', ` ${singleBoard.tasks[0].title}`)
      .should('be.visible')

    cy.get(trelloItems.singleTask)
      .eq(1)
      .should('have.text', ` ${singleBoard.tasks[1].title}`)
      .should('be.visible')

    cy.get(trelloItems.singleTask)
      .eq(2)
      .should('have.text', ` ${singleBoard.tasks[2].title}`)
      .should('be.visible') 
    }) 

  });
});