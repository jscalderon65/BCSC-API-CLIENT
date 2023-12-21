import { CreateStateDto } from '../../state/dto/create-state.dto';
import { faker } from '@faker-js/faker';

export const CreateStateDtoStub = (): CreateStateDto => {
  return { name: faker.location.country() };
};
