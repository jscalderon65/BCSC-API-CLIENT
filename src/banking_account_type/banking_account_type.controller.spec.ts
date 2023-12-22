import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import {
  schemaName,
  BankingAccountTypeDocument,
} from './schemas/banking_account_type.schema';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../utils/testDb/mongodb-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { BankingAccountTypeModule } from './banking_account_type.module';
import { CreateBankingAccountTypeStub } from '../utils/stubs/bankingAccountType.stub';

let app;
let BankingAccountTypeModel: Model<BankingAccountTypeDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), BankingAccountTypeModule],
  }).compile();

  BankingAccountTypeModel = moduleFixture.get<
    Model<BankingAccountTypeDocument>
  >(getModelToken(schemaName));
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('BankingAccountTypeController', () => {
  describe('Controller status test', () => {
    it('POST /banking-account-type should return 201', async () => {
      const newBankingAccountType = CreateBankingAccountTypeStub();
      const result = await request(app.getHttpServer())
        .post('/banking-account-type')
        .send(newBankingAccountType)
        .expect(201);

      expect(result.body.name).toBe(newBankingAccountType.name);
    });

    it('GET /banking-account-type should return 200', async () => {
      await BankingAccountTypeModel.insertMany([
        CreateBankingAccountTypeStub(),
        CreateBankingAccountTypeStub(),
      ]);
      const result = await request(app.getHttpServer())
        .get('/banking-account-type')
        .expect(200);

      const allNewBankingAccountTypes = await BankingAccountTypeModel.find();
      expect(result.body.length).toBe(allNewBankingAccountTypes.length);
    });

    it('GET /banking-account-type/:id should return 200', async () => {
      const newBankingAccountType = await BankingAccountTypeModel.create(
        CreateBankingAccountTypeStub(),
      );

      const id = newBankingAccountType._id;

      await request(app.getHttpServer())
        .get('/banking-account-type/' + id)
        .expect(200);
    });

    it('PATCH /banking-account-type/:id should return 200', async () => {
      const baseDocumentStub = CreateBankingAccountTypeStub();
      const newBankingAccountType =
        await BankingAccountTypeModel.create(baseDocumentStub);

      const id = newBankingAccountType._id;

      const result = await request(app.getHttpServer())
        .patch('/banking-account-type/' + id)
        .send({ name: CreateBankingAccountTypeStub().name })
        .expect(200);

      expect(id).not.toBe(result.body._id);

      expect(baseDocumentStub.name).not.toBe(result.body.name);
    });

    it('DELETE /banking-account-type/:id should return 200', async () => {
      const newBankingAccountType = await BankingAccountTypeModel.create(
        CreateBankingAccountTypeStub(),
      );

      const id = newBankingAccountType._id;

      await request(app.getHttpServer())
        .delete('/banking-account-type/' + id)
        .expect(200);

      const verification = await BankingAccountTypeModel.findById(id);

      expect(verification).toBeNull();
    });
  });
});
