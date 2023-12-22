import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import { nameSchema, StateDocument } from './schemas/state.schema';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../utils/testDb/mongodb-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { StateModule } from './state.module';
import { CreateStateDtoStub } from '../utils/stubs/state.stub';

let app;
let stateModel: Model<StateDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), StateModule],
  }).compile();

  stateModel = moduleFixture.get<Model<StateDocument>>(
    getModelToken(nameSchema),
  );
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('StateController', () => {
  describe('State status test', () => {
    it('POST /state should return 201', async () => {
      const newState = CreateStateDtoStub();
      const result = await request(app.getHttpServer())
        .post('/state')
        .send(newState)
        .expect(201);

      expect(result.body.name).toBe(newState.name);
    });

    it('GET /state should return 200', async () => {
      await stateModel.insertMany([CreateStateDtoStub(), CreateStateDtoStub()]);
      const result = await request(app.getHttpServer())
        .get('/state')
        .expect(200);

      const allStates = await stateModel.find();
      expect(result.body.length).toBe(allStates.length);
    });

    it('GET /state/:id should return 200', async () => {
      const newState = await stateModel.create(CreateStateDtoStub());

      const id = newState._id;

      await request(app.getHttpServer())
        .get('/state/' + id)
        .expect(200);
    });

    it('PATCH /state/:id should return 200', async () => {
      const baseDocumentStub = CreateStateDtoStub();
      const newState = await stateModel.create(baseDocumentStub);

      const id = newState._id;

      const result = await request(app.getHttpServer())
        .patch('/state/' + id)
        .send({ name: CreateStateDtoStub().name })
        .expect(200);

      expect(id).not.toBe(result.body._id);

      expect(baseDocumentStub.name).not.toBe(result.body.name);
    });

    it('DELETE /state/:id should return 200', async () => {
      const newState = await stateModel.create(CreateStateDtoStub());

      const id = newState._id;

      await request(app.getHttpServer())
        .delete('/state/' + id)
        .expect(200);

      const verification = await stateModel.findById(id);

      expect(verification).toBeNull();
    });
  });
});
