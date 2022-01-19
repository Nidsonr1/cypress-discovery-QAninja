import signup from '../pages/SignupPage'

describe('Cadastro', () => {

  it('Usuário deve se tornar um entregador', () => {
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
    const expectedMessageSwal = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

    signup.go();
    signup.fillForm(deliver);
    signup.submit()
    signup.modalContentShouldBe(expectedMessageSwal)
  });

  it('CPF incorreto', () => {
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

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe('Oops! CPF inválido');
  });
});
