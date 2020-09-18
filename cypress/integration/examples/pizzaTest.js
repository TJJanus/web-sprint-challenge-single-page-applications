// write tests here
describe('Test 1 - checking Name Input', function () {
    beforeEach( () => {
        cy.visit('http://localhost:3000/')
    })


    const nameInput = () => cy.get('input[name="name"]')
    
    
    

    it('sanity check to make sure tests work', () => {
        expect(1 + 2).to.equal(3)
    })

    it('Checks the Name input', () => {
        nameInput()
            .should('exist')
            .type('TJ Janus')
            .should('have.value', 'TJ Janus') // assertion
    })

});


//CHECKBOXES

const checkInput = () => cy.get('[type="checkbox"]')

describe("Test 2 - checking toppings", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000/pizza/");
    });

    it("checks checkboxes", function () {
        checkInput()
        .check()
        .should("be.checked");

    });
  });




// SUBMIT FORM

const submitForm = () => cy.get('[name="fun"]')

describe("Test 3 - checking button", function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza/");
        cy.get('#size').select('small').should('have.value', 'small')

      })

    it('Checks add to order button', function () {
        submitForm().click()
    })
})


  

