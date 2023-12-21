import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import {
  DocumentTypeDocument,
  DocumentType,
} from './schemas/document_type.schema';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../utils/testDb/mongodb-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { DocumentTypeModule } from './document_type.module';
import { CreateDocumentTypeDtoStub } from '../utils/stubs/documentType.stub';

let app;
let documentTypeModel: Model<DocumentTypeDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), DocumentTypeModule],
  }).compile();

  documentTypeModel = moduleFixture.get<Model<DocumentTypeDocument>>(
    getModelToken(DocumentType.name),
  );
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('DocumentTypeController', () => {
  describe('Controller status test', () => {
    it('POST /document-type should return 201', async () => {
      const newDocumentType = CreateDocumentTypeDtoStub();
      const result = await request(app.getHttpServer())
        .post('/document-type')
        .send(newDocumentType)
        .expect(201);

      expect(result.body.code).toBe(newDocumentType.code);
      expect(result.body.name).toBe(newDocumentType.name);
    });

    it('GET /document-type should return 200', async () => {
      await documentTypeModel.insertMany([
        CreateDocumentTypeDtoStub(),
        CreateDocumentTypeDtoStub(),
      ]);
      const result = await request(app.getHttpServer())
        .get('/document-type')
        .expect(200);

      const allDocumentTypes = await documentTypeModel.find();
      expect(result.body.length).toBe(allDocumentTypes.length);
    });

    it('GET /document-type/:id should return 200', async () => {
      const newDocumentType = await documentTypeModel.create(
        CreateDocumentTypeDtoStub(),
      );

      const id = newDocumentType._id;

      await request(app.getHttpServer())
        .get('/document-type/' + id)
        .expect(200);
    });

    it('PATCH /document-type/:id should return 200', async () => {
      const baseDocumentStub = CreateDocumentTypeDtoStub();
      const newDocumentType = await documentTypeModel.create(baseDocumentStub);

      const id = newDocumentType._id;

      const result = await request(app.getHttpServer())
        .patch('/document-type/' + id)
        .send({ code: CreateDocumentTypeDtoStub().code })
        .expect(200);

      expect(id).not.toBe(result.body._id);

      expect(baseDocumentStub.code).not.toBe(result.body.code);
      expect(baseDocumentStub.name).toBe(result.body.name);
    });

    it('DELETE /document-type/:id should return 200', async () => {
      const newDocumentType = await documentTypeModel.create(
        CreateDocumentTypeDtoStub(),
      );

      const id = newDocumentType._id;

      await request(app.getHttpServer())
        .delete('/document-type/' + id)
        .expect(200);

      const verification = await documentTypeModel.findById(id);

      expect(verification).toBeNull();
    });
  });
});
