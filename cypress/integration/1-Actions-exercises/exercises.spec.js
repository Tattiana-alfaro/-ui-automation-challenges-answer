/// <reference types="Cypress" />

describe('Actions', () =>{
    context('Exercises', () =>{
        before('Navigate to actions section', () =>{
            cy.visit('http://localhost:8080/challenges/actions');
        });
        context('Exercise 1', () =>{
            it('Typing and sending keys:', () =>{
                //Type fake@email.com inside the email input. Then validate that:
                //Assert that the value of the input equals to "fake@email.com"
                cy.get('.action-email').type('fake@email.com')
                    .should('have.value', 'fake@email.com')
                    //Send the keyboard keys: CTRL + A (Win) or COMMAND + A (Mac) to select all and then DELETE. Validate that:
                    //Assert that the input value is empty after the delete key is sent
                    .type('{selectall}{del}')
                    .should('have.value', '');
                    //Given the disabled text area, find a way to force typing the words Text typed inside disabled textarea into it. Validate that:
                    //Assert that the text area contains "Text typed inside disabled textarea"
                    cy.get('.action-disabled').type('Text typed inside disabled textarea', { force: true })
                    .should('have.value', 'Text typed inside disabled textarea');                    
            });
        });
        context('Exercise 2', () => {
            /**
            * Part 1: Focus Given the password input, set the cursor focus on it and validate that:
            * The label should turn into orange color
            * And the input should show an orange border
            */
            it('Part 1: Focus', () => {
             cy.get('.action-focus').focus()
                .should('have.class', 'focus')
                .should('have.css','border', '5px solid rgb(255, 165, 0)')
                .prev().should('have.attr', 'style', 'color: orange;');
            });
             /** Part 2: Blur
             * Given the Full Name input, focust on it and then loose that focus (blur). Then validate that:
             * The label should turn into red color
             * And the input should show a red border
             */
            it('Part 2: Blur', () =>{
                cy.get('.action-blur').type('About to blur').blur()
                    .should('have.class', 'error')
                    .should('have.css','border', '5px solid rgb(255, 0, 0)')
                    .prev().should('have.attr', 'style', 'color: red;');
            });
        });
        /**
        * Exercise 3
        * Given the coupon code field, fill it with a string and then submit the form. After submitting the form validate that:
        * The following text should be displayed: "Your form has been submitted!"
        * Note: You can send the enter key to trigger the fo
        */
        context('Exercise 3', () => {
            it('Submitting a form', () =>{
                cy.get('#couponCode1').type('Text to be submitted');
                cy.get('.action-form').submit().next().should('contain', 'Your form has been submitted!');
            });
        });

        context('Exercise 4', () => {
            it('Part 1: Popover and canvas', () =>{
                cy.get('.action-btn').click();
                cy.get('.popover').should('be.visible');
                cy.get('#action-canvas').click(80, 75)
                .click(170, 75)
                .click(80, 165)
                .click(100, 185)
                .click(125, 190)
                .click(150, 185)
                .click(170, 165);
            });
            it('Part 2: Multiple clicks and force', () =>{
                 // click multiple elements by passing multiple: true
                cy.get('.action-labels>.label').click({ multiple: true })
                cy.get('.action-labels .popover-content').should('be.visible');

                // Ignore error checking prior to clicking
                cy.get('.action-opacity>.btn').click({ force: true });
                cy.get('[class="popover fade left in"]').should('be.visible');
            });
        });
        context('Exercise 5', () => {
            it('Double click element', () => {
                cy.get('.well .action-div').should('be.visible').dblclick().should('not.be.visible');
                cy.get('.action-input-hidden[value="Double click to edit"]').should('be.visible');
            });
        });
        context('Exercise 6', () => {
            it('Right click element', () =>{
                cy.get('.rightclick-action-div').should('be.visible').rightclick().should('not.be.visible');
                cy.get('.rightclick-action-input-hidden').should('be.visible');
            });
        });
    });
});