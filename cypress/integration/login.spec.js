import Chance from 'chance'
const chance = new Chance()

describe('MkClients', ()=>{
    const email = chance.email()
    const user = {
        "name": "Rafael",
        "email": "r.paivabr@gmail.com",
        "password": "abc123",
        "id": "1"
    }

    it('has a title', ()=>{
        cy.visit('http://localhost:4200')
        cy.contains('MkClients')
    })

    it('inicial redirect to login page', ()=>{
        cy.visit('http://localhost:4200')
        cy.url().should('include', 'login')
    })

    it('try login with wrong credentials', ()=>{
        cy.get('input[type=text]').type(email)
        cy.get('input[type=password]').type(user.password)
        cy.get('button[type=submit]').click()
        //error message
        cy.contains('Invalid Credentials.')
    })

    it('login', ()=>{
        cy.visit('http://localhost:4200')

        cy.get('input[type=text]').type(user.email)
        cy.get('input[type=password]').type(user.password)

        cy.get('button[type=submit]').click()
        cy.contains(user.name)       
    })

    it('testing status and name filters', ()=>{
        cy.wait(500)
        cy.get('#filter_active').click()
        cy.wait(500)
        cy.get('#filter_inactive').click()
        cy.wait(500)
        cy.get('#filter_all').click()
        cy.wait(1500)

        cy.get('#search').type('na')
        cy.wait(3000)
        cy.get('.place-info-box-content').should('length', 2)
    })

    it('trying to create client with existing CPF in db', ()=>{
        cy.get('#new_user').click()
        cy.url().should('include', 'clients/new')
        cy.contains('Novo')

        cy.get('#input_name').type(client.name)
        cy.get('#input_email').type(client.email)
        cy.get('#input_tel_1').type(client.telefones[0].ddd + client.telefones[0].number)
        cy.get('#input_cpf').type('31391846893')
        cy.get('#input_rg').type(client.rg)

        cy.get('button[type=submit]').click()
        cy.contains('Missing required client data.')    
    })

})