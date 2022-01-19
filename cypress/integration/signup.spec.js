import signup from '../pages/SignupPage'

describe('Signup', () => {
  beforeEach(function() {
    cy.fixture("deliver").then((d) => {
      this.deliver = d;
    })
  })

  it('User should be deliverboy', function() {
    const expectedMessageSwal = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

    signup.go();
    signup.fillForm(this.deliver.signup);
    signup.submit()
    signup.modalContentShouldBe(expectedMessageSwal)
  });

  it('Invalid document', function() {
    signup.go();
    signup.fillForm(this.deliver.cpf_inv);
    signup.submit();
    signup.alertMessageShouldBe('Oops! CPF inválido');
  });
});
