import faker from 'faker'
describe('Home Page', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    it('successfully landing on the home page', () => {
        cy.visit('http://127.0.0.1:8000')
    })
})