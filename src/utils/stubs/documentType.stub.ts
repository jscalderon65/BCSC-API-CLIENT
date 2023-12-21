import { CreateDocumentTypeDto } from 'src/document_type/dto/create-document_type.dto';
import { faker } from '@faker-js/faker';

export const CreateDocumentTypeDtoStub = (): CreateDocumentTypeDto => {
  return { name: faker.lorem.sentence(), code: faker.lorem.word() };
};
