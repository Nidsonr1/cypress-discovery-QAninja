import signupPage from '../pages/SignupPage'
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

    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit()
    signupPage.modalContentShouldBe(expectedMessageSwal)
  });

  it('Invalid document', function() {
    var deliver = signupFactory.deliver()
    deliver.cpf = '04864870322AA'

    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    signupPage.alertMessageShouldBe('Oops! CPF inválido');
  });

  it('Invalid Email', function() {
    var deliver = signupFactory.deliver()
    deliver.email = 'ada.com.br'

    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    signupPage.alertMessageShouldBe('Oops! Email com formato inválido.');
  });

  it('Required fields', function() {
    signupPage.go();
    signupPage.submit();
    signupPage.alertMessageShouldBe('É necessário informar o nome');
    signupPage.alertMessageShouldBe('É necessário informar o CPF');
    signupPage.alertMessageShouldBe('É necessário informar o email');
    signupPage.alertMessageShouldBe('É necessário informar o CEP');
    signupPage.alertMessageShouldBe('É necessário informar o número do endereço');
    signupPage.alertMessageShouldBe('Selecione o método de entrega');
    signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH');
  })
});
