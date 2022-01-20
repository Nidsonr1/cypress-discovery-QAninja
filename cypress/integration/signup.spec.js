import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory';

describe('Signup', () => {
  // beforeEach(function() {
  //   cy.fixture("deliver").then((d) => {
  //     this.deliver = d;
  //   })
  // })
  
  it('User should be deliverboy', function() {
    const expectedMessageSwal = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

    var deliver = signupFactory.deliver()

    signup.go();
    signup.fillForm(deliver);
    signup.submit()
    signup.modalContentShouldBe(expectedMessageSwal)
  });

  it('Invalid document', function() {
    var deliver = signupFactory.deliver()
    deliver.cpf = '04864870322AA'

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe('Oops! CPF inválido');
  });

  it('Invalid Email', function() {
    var deliver = signupFactory.deliver()
    deliver.email = 'ada.com.br'

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe('Oops! Email com formato inválido.');
  })
});
