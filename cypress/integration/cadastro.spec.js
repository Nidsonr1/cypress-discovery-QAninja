describe('Cadastro', () => {
  it('Usuário deve se tornar um entregador', () => {
    cy.viewport(1440, 900);
    cy.visit('https://buger-eats.vercel.app');

    cy.get('a[href="/deliver"]')
      .click();

    cy.url('https://buger-eats.vercel.app').should('match', /deliver/);
    cy.get("#page-deliver form h1")
      .should('have.text', 'Cadastre-se para  fazer entregas');

    var deliver = {
      name: 'John Doe',
      cpf: '04864870322',
      email: 'deliver.teste@gmail.com',
      whatsapp: '(88) 3839-6986',
      address: {
        postalcode: '63021-240',
        street: 'Rua Antônio Eliomar Félix',
        number: '639',
        details: 'Apt 142',
        district: 'Aeroporto',
        city_state: 'Juazeiro do Norte/CE'
      },
      deliver_method: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    //Preenche campos Dados 
    cy.get('input[name="name"]').type(deliver.name);
    cy.get('input[name="cpf"]').type(deliver.cpf);
    cy.get('input[name="email"]').type(deliver.email);
    cy.get('input[name="whatsapp"]').type(deliver.whatsapp);
    
    //Preenche campos de Endereço
    cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
    cy.get('input[type=button][value="Buscar CEP"]').click();

    cy.get('input[name="address"]').should('have.value', deliver.address.street);

    cy.get('input[name="address-number"]').type(deliver.address.number);
    cy.get('input[name="address-details"]').type(deliver.address.details);

    cy.get('input[name="district"]').should('have.value', deliver.address.district);
    cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

    cy.contains('.delivery-method li', deliver.deliver_method).click();
    
    cy.get('input[accept^="image"]').attachFile(`/images/${deliver.cnh}`);

    cy.get('form button[type="submit"]').click();

    const expectedMessageSwal = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

    cy.get('.swal2-container .swal2-html-container')
      .should('have.text', expectedMessageSwal);

    cy.get('button[class="swal2-confirm swal2-styled"]').click();
  });

  it('CPF incorreto', () => {
    cy.viewport(1440, 900);
    cy.visit('https://buger-eats.vercel.app');

    cy.get('a[href="/deliver"]')
      .click();

    cy.url('https://buger-eats.vercel.app').should('match', /deliver/);
    cy.get("#page-deliver form h1")
      .should('have.text', 'Cadastre-se para  fazer entregas');

    var deliver = {
      name: 'John Doe',
      cpf: '04864870322AA',
      email: 'deliver.teste@gmail.com',
      whatsapp: '(88) 3839-6986',
      address: {
        postalcode: '63021-240',
        street: 'Rua Antônio Eliomar Félix',
        number: '639',
        details: 'Apt 142',
        district: 'Aeroporto',
        city_state: 'Juazeiro do Norte/CE'
      },
      deliver_method: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    //Preenche campos Dados 
    cy.get('input[name="name"]').type(deliver.name);
    cy.get('input[name="cpf"]').type(deliver.cpf);
    cy.get('input[name="email"]').type(deliver.email);
    cy.get('input[name="whatsapp"]').type(deliver.whatsapp);
    
    //Preenche campos de Endereço
    cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
    cy.get('input[type=button][value="Buscar CEP"]').click();

    cy.get('input[name="address"]').should('have.value', deliver.address.street);

    cy.get('input[name="address-number"]').type(deliver.address.number);
    cy.get('input[name="address-details"]').type(deliver.address.details);

    cy.get('input[name="district"]').should('have.value', deliver.address.district);
    cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

    cy.contains('.delivery-method li', deliver.deliver_method).click();
    
    cy.get('input[accept^="image"]').attachFile(`/images/${deliver.cnh}`);

    cy.get('form button[type="submit"]').click();

    cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
  });
});
