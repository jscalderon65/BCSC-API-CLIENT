import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../utils/testDb/mongodb-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { mongoDb } from '../utils/constants/mongoDb';
import { BankingAccountModule } from './banking_account.module';
import { BankingAccountDocument } from './schemas/banking_account.schema';
import { BankingAccountTypeDocument } from '../banking_account_type/schemas/banking_account_type.schema';
import { CreateBankingAccountStub } from '../utils/stubs/bankingAccoun.stub';
import { faker } from '@faker-js/faker';

const { BANKING_ACCOUNT_TYPE, BANKING_ACCOUNT } = mongoDb.SCHEMA_NAMES;
let app;
let bankingAccountTypeModel: Model<BankingAccountTypeDocument>;
let bankingAccountModel: Model<BankingAccountDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), BankingAccountModule],
  }).compile();

  bankingAccountTypeModel = moduleFixture.get<
    Model<BankingAccountTypeDocument>
  >(getModelToken(BANKING_ACCOUNT_TYPE));

  bankingAccountModel = moduleFixture.get<Model<BankingAccountDocument>>(
    getModelToken(BANKING_ACCOUNT),
  );
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('BankingAccountController', () => {
  describe('BankingAccount status test', () => {
    it('GET /banking-account should return 200', async () => {
      const result = await request(app.getHttpServer())
        .get('/banking-account')
        .expect(200);
      const allBankingAccounts = await bankingAccountTypeModel.find();
      expect(result.body.length).toBe(allBankingAccounts.length);
    });

    it('GET /banking-account/:id should return 200', async () => {
      const newBankingAccount = await bankingAccountModel.create({
        ...CreateBankingAccountStub(),
        account_number: faker.finance.accountNumber(10),
      });

      const id = newBankingAccount._id;

      await request(app.getHttpServer())
        .get('/banking-account/' + id)
        .expect(200);
    });

    it('PATCH banking-account/:id should return 200', async () => {
      const baseDocumentStub = {
        ...CreateBankingAccountStub(),
        account_number: faker.finance.accountNumber(10),
      };
      const newBankingAccount =
        await bankingAccountModel.create(baseDocumentStub);

      const id = newBankingAccount._id;

      const result = await request(app.getHttpServer())
        .patch('/banking-account/' + id)
        .send({
          available_balance: 100,
        })
        .expect(200);
      expect(id.toString()).toBe(result.body._id);
    });

    it('DELETE banking-account/:id should return 200', async () => {
      const baseDocumentStub = {
        ...CreateBankingAccountStub(),
        account_number: faker.finance.accountNumber(10),
      };
      const newBankingAccount =
        await bankingAccountModel.create(baseDocumentStub);

      const id = newBankingAccount._id;

      await request(app.getHttpServer())
        .delete('/banking-account/' + id)
        .expect(200);

      const verification = await bankingAccountModel.findById(id);

      expect(verification).toBeNull();
    });
  });
});
