import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory';

describe('Signup', () => {
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

  context('Required fields', function() {

    const messages = [
      {field: 'name', output: 'É necessário informar o nome'},
      {field: 'cpf', output: 'É necessário informar o CPF'},
      {field: 'email', output: 'É necessário informar o email'},
      {field: 'postalcode', output: 'É necessário informar o CEP'},
      {field: 'number', output: 'É necessário informar o número do endereço'},
      {field: 'delivery_method', output: 'Selecione o método de entrega'},
      {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
    ]

    before(function() {
      signupPage.go();
      signupPage.submit();
    });

    messages.forEach(function(message) {
      it(`${message.field} is required`, function() {
        signupPage.alertMessageShouldBe(message.output);
      });
    });
  });
});
