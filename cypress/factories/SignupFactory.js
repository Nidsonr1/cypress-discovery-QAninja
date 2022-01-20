var faker = require('faker/locale/pt_BR');
var cpf = require('gerador-validador-cpf');

export default {

  deliver: function() {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
  
    var data = {
      name: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
      whatsapp: faker.phone.phoneNumber(),
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

    return data;
  }
}