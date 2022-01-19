import signup from '../pages/SignupPage'

describe('Cadastro', () => {
  beforeEach(function() {
    cy.fixture("deliver").then((d) => {
      this.deliver = d;
    })
  })

  it('Usuário deve se tornar um entregador', function() {
    const expectedMessageSwal = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

    signup.go();
    signup.fillForm(this.deliver.signup);
    signup.submit()
    signup.modalContentShouldBe(expectedMessageSwal)
  });

  it('CPF incorreto', function() {
    signup.go();
    signup.fillForm(this.deliver.cpf_inv);
    signup.submit();
    signup.alertMessageShouldBe('Oops! CPF inválido');
  });
});
