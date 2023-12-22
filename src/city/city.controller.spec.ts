import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../utils/testDb/mongodb-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCityDtoWithObjectIdStub } from '../utils/stubs/city.stub';
import { CityModule } from './city.module';
import { City, CityDocument } from './schemas/city.schema';
import { State, StateDocument } from '../state/schemas/state.schema';
import { CreateStateDtoStub } from '../utils/stubs/state.stub';

let app;
let cityModel: Model<CityDocument>;
let stateModel: Model<StateDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), CityModule],
  }).compile();

  cityModel = moduleFixture.get<Model<CityDocument>>(getModelToken(City.name));
  stateModel = moduleFixture.get<Model<StateDocument>>(
    getModelToken(State.name),
  );
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('CityController', () => {
  describe('City status test', () => {
    it('POST /city should return 201', async () => {
      const newState = await stateModel.create(CreateStateDtoStub());

      const newCity = {
        ...CreateCityDtoWithObjectIdStub().dto,
        state_id: newState._id,
      };

      const result = await request(app.getHttpServer())
        .post('/city')
        .send(newCity)
        .expect(201);

      expect(result.body.name).toBe(newCity.name);
    });

    it('GET /city should return 200', async () => {
      await cityModel.insertMany([
        CreateCityDtoWithObjectIdStub().dto,
        CreateCityDtoWithObjectIdStub().dto,
      ]);
      const result = await request(app.getHttpServer())
        .get('/city')
        .expect(200);

      const allStates = await cityModel.find();
      expect(result.body.length).toBe(allStates.length);
    });

    it('GET /city/:id should return 200', async () => {
      const newState = await cityModel.create(
        CreateCityDtoWithObjectIdStub().dto,
      );

      const id = newState._id;

      await request(app.getHttpServer())
        .get('/city/' + id)
        .expect(200);
    });

    it('PATCH /city/:id should return 200', async () => {
      const baseDocumentStub = CreateCityDtoWithObjectIdStub().dto;
      const newState = await cityModel.create(baseDocumentStub);

      const id = newState._id;

      const result = await request(app.getHttpServer())
        .patch('/city/' + id)
        .send({ name: CreateCityDtoWithObjectIdStub().dto.name })
        .expect(200);

      expect(id).not.toBe(result.body._id);

      expect(baseDocumentStub.name).not.toBe(result.body.name);
    });

    it('DELETE /city/:id should return 200', async () => {
      const newState = await cityModel.create(
        CreateCityDtoWithObjectIdStub().dto,
      );

      const id = newState._id;

      await request(app.getHttpServer())
        .delete('/city/' + id)
        .expect(200);

      const verification = await cityModel.findById(id);

      expect(verification).toBeNull();
    });
  });
});
