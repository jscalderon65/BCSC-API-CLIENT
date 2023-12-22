import { faker } from '@faker-js/faker';
import { CreateCityDto } from '../../city/dto/create-city.dto';
import mongoose from 'mongoose';

export const CreateCityDtoWithObjectIdStub = (): {
  dto: CreateCityDto;
  objectId: mongoose.Types.ObjectId;
} => {
  const objectId = new mongoose.Types.ObjectId();
  const dto: CreateCityDto = {
    name: faker.location.country(),
    state_id: objectId.toString(),
  };
  return { dto, objectId };
};
