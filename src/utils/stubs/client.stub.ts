import { faker } from '@faker-js/faker';
import { CreateClientDto } from 'src/client/dto/create-client.dto';

export const CreateClientDtoStub = (
  document_type_id,
  city_id,
): CreateClientDto => {
  return {
    document_type_id,
    document_number: faker.finance.accountNumber(10),
    first_name: faker.person.firstName(),
    middle_name: faker.person.firstName(),
    last_name: faker.person.firstName(),
    second_last_name: faker.person.firstName(),
    email: faker.internet.email(),
    city_id,
  };
};
