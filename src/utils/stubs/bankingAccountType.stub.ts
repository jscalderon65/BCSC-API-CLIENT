import { faker } from '@faker-js/faker';
import { CreateBankingAccountTypeDto } from '../../banking_account_type/dto/create-banking_account_type.dto';

export const CreateBankingAccountTypeStub = (): CreateBankingAccountTypeDto => {
  return { name: faker.lorem.sentence() };
};
