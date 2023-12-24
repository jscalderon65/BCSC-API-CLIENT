import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import mongoose, { Model } from 'mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../utils/testDb/mongodb-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCityDtoWithObjectIdStub } from '../utils/stubs/city.stub';
import { CityDocument } from '../city/schemas/city.schema';
import { mongoDb } from '../utils/constants/mongoDb';
import { BankingAccountDocument } from '../banking_account/schemas/banking_account.schema';
import { DocumentTypeDocument } from '../document_type/schemas/document_type.schema';
import { ClientModule } from './client.module';
import { ClientDocument } from './schemas/client.schema';
import { CreateDocumentTypeDtoStub } from '../utils/stubs/documentType.stub';
import { CreateClientDtoStub } from '../utils/stubs/client.stub';
import { CreateBankingAccountStub } from '../utils/stubs/bankingAccoun.stub';
import { BankingAccountTypeDocument } from '../banking_account_type/schemas/banking_account_type.schema';
import { CreateBankingAccountTypeStub } from '../utils/stubs/bankingAccountType.stub';

const { DOCUMENT_TYPE, BANKING_ACCOUNT, CITY, CLIENT, BANKING_ACCOUNT_TYPE } =
  mongoDb.SCHEMA_NAMES;
let app;

let clientModel: Model<ClientDocument>;
let cityModel: Model<CityDocument>;
let bankingAccountModel: Model<BankingAccountDocument>;
let bankingAccountTypeModel: Model<BankingAccountTypeDocument>;
let documentTypeModel: Model<DocumentTypeDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), ClientModule],
  }).compile();

  bankingAccountModel = moduleFixture.get<Model<BankingAccountDocument>>(
    getModelToken(BANKING_ACCOUNT),
  );

  bankingAccountTypeModel = moduleFixture.get<
    Model<BankingAccountTypeDocument>
  >(getModelToken(BANKING_ACCOUNT_TYPE));

  documentTypeModel = moduleFixture.get<Model<DocumentTypeDocument>>(
    getModelToken(DOCUMENT_TYPE),
  );

  cityModel = moduleFixture.get<Model<CityDocument>>(getModelToken(CITY));

  clientModel = moduleFixture.get<Model<ClientDocument>>(getModelToken(CLIENT));

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('ClientController', () => {
  describe('Client status test', () => {
    it('POST /client should return 201', async () => {
      const newCity = await cityModel.create(
        CreateCityDtoWithObjectIdStub().dto,
      );

      const newDocumentType = await documentTypeModel.create(
        CreateDocumentTypeDtoStub(),
      );

      const newClient = CreateClientDtoStub(newDocumentType._id, newCity._id);

      const result = await request(app.getHttpServer())
        .post('/client')
        .send(newClient)
        .expect(201);

      expect(result.body.document_number).toBe(newClient.document_number);
    });

    it('GET /client should return 200', async () => {
      const objectId = new mongoose.Types.ObjectId().toString();
      await clientModel.insertMany([
        CreateClientDtoStub(objectId, objectId),
        CreateClientDtoStub(objectId, objectId),
      ]);

      const result = await request(app.getHttpServer())
        .get('/client')
        .expect(200);

      const allClients = await clientModel.find();

      expect(result.body.length).toBe(allClients.length);
    });

    it('GET /client/:id should return 200', async () => {
      const objectId = new mongoose.Types.ObjectId().toString();
      const newClient = await clientModel.create(
        CreateClientDtoStub(objectId, objectId),
      );

      const id = newClient._id;

      await request(app.getHttpServer())
        .get('/client/' + id)
        .expect(200);
    });

    it('PATCH /client/:id should return 200', async () => {
      const objectId = new mongoose.Types.ObjectId().toString();
      const baseDocumentStub = CreateClientDtoStub(objectId, objectId);
      const newClient = await clientModel.create(baseDocumentStub);
      const id = newClient._id;

      const result = await request(app.getHttpServer())
        .patch('/client/' + id)
        .send({
          first_name: CreateClientDtoStub(objectId, objectId).first_name,
        })
        .expect(200);

      expect(id.toString()).toBe(result.body._id);

      expect(baseDocumentStub.first_name).not.toBe(result.body.name);
    });

    it('DELETE /client/:id should return 200', async () => {
      const objectId = new mongoose.Types.ObjectId().toString();
      const baseDocumentStub = CreateClientDtoStub(objectId, objectId);
      const newClient = await clientModel.create(baseDocumentStub);

      const id = newClient._id;

      await request(app.getHttpServer())
        .delete('/client/' + id)
        .expect(200);

      const verification = await clientModel.findById(id);

      expect(verification).toBeNull();
    });

    it('POST /client/new-banking-account should return 200', async () => {
      const newBankingTypeAccount = await bankingAccountTypeModel.create(
        CreateBankingAccountTypeStub(),
      );
      const objectId = new mongoose.Types.ObjectId().toString();
      const baseDocumentStub = CreateClientDtoStub(objectId, objectId);
      const newClient = await clientModel.create(baseDocumentStub);

      const id = newClient._id.toString();

      const newBankingAccount = {
        ...CreateBankingAccountStub(),
        client_id: id,
        account_type_id: newBankingTypeAccount._id.toString(),
      };

      const result = await request(app.getHttpServer())
        .post('/client/new-banking-account')
        .send(newBankingAccount)
        .expect(201);

      const verification = bankingAccountModel.findById(result.body._id);

      expect(verification).not.toBe(null);
    });
  });
});
