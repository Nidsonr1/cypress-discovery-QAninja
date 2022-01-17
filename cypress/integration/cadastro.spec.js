describe('Cadastro', () => {
  it('Usuário deve se tornar um entregador', () => {
    cy.viewport(1440, 900);
    cy.visit('https://buger-eats.vercel.app');

    cy.get('a[href="/deliver"]')
      .click();

    cy.url('https://buger-eats.vercel.app').should('match', /deliver/);
    cy.get("#page-deliver form h1")
      .should('have.text', 'Cadastre-se para  fazer entregas');

    var entregador = {
      nome: 'John Doe',
      cpf: '04864870322',
      email: 'entregador.teste@gmail.com',
      whatsapp: '(88) 3839-6986',
      endereco: {
        cep: '63021-240',
        rua: 'Rua Antônio Eliomar Félix',
        numero: '639',
        complemento: 'Apt 142',
        bairro: 'Aeroporto',
        cidade_uf: 'Juazeiro do Norte/CE'
      },
      metodo_entrega: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    //Preenche campos Dados 
    cy.get('input[name="name"]').type(entregador.nome);
    cy.get('input[name="cpf"]').type(entregador.cpf);
    cy.get('input[name="email"]').type(entregador.email);
    cy.get('input[name="whatsapp"]').type(entregador.whatsapp);
    
    //Preenche campos de Endereço
    cy.get('input[name="postalcode"]').type(entregador.endereco.cep);
    cy.get('input[type=button][value="Buscar CEP"]').click();

    cy.get('input[name="address"]').should('have.value', entregador.endereco.rua);

    cy.get('input[name="address-number"]').type(entregador.endereco.numero);
    cy.get('input[name="address-details"]').type(entregador.endereco.complemento);

    cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro);
    cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

    cy.contains('.delivery-method li', entregador.metodo_entrega).click();
    
    cy.get('input[accept^="image"]').attachFile(`/images/${entregador.cnh}`);

    cy.get('form button[type="submit"]').click();

    const expectedMessageSwal = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

    cy.get('.swal2-container .swal2-html-container')
      .should('have.text', expectedMessageSwal);

    cy.get('button[class="swal2-confirm swal2-styled"]').click();
  });
});
