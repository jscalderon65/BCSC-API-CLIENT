import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DocumentTypeService } from './document_type.service';
import { nameSchema, DocumentType } from './schemas/document_type.schema';
import { CreateDocumentTypeDtoStub } from '../utils/stubs/documentType.stub';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('DocumentTypeService', () => {
  let service: DocumentTypeService;

  const mockDocumentTypeModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentTypeService,
        {
          provide: getModelToken(nameSchema),
          useValue: mockDocumentTypeModel,
        },
      ],
    }).compile();

    service = module.get<DocumentTypeService>(DocumentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a documentType', async () => {
    const createDocumentDto = CreateDocumentTypeDtoStub();

    const mockCreatedDocument: DocumentType = {
      code: createDocumentDto.code,
      name: createDocumentDto.name,
    };

    mockDocumentTypeModel.create.mockResolvedValue(mockCreatedDocument);

    const result = await service.create(createDocumentDto);

    expect(mockDocumentTypeModel.create).toHaveBeenCalledWith(
      createDocumentDto,
    );

    expect(result).toEqual(mockCreatedDocument);
  });

  it('should find all documentTypes', async () => {
    const mockQuery = {};
    const mockFoundDocumentTypes: DocumentType[] = [
      CreateDocumentTypeDtoStub(),
      CreateDocumentTypeDtoStub(),
    ];

    mockDocumentTypeModel.find.mockResolvedValue(mockFoundDocumentTypes);

    const result = await service.findAll({ query: mockQuery } as any);

    expect(result).toEqual(mockFoundDocumentTypes);
  });

  it('should find one documentType by id', async () => {
    const id = faker.string.uuid();
    const mockFoundDocumentType: DocumentType = CreateDocumentTypeDtoStub();

    mockDocumentTypeModel.findById.mockResolvedValue(mockFoundDocumentType);

    const result = await service.findOne(id);

    expect(result).toEqual(mockFoundDocumentType);
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = faker.string.uuid();
    mockDocumentTypeModel.findById.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a documentType', async () => {
    const id = faker.string.uuid();
    const updateDocumentTypeDto = CreateDocumentTypeDtoStub();
    const mockUpdatedDocument: DocumentType = CreateDocumentTypeDtoStub();

    mockDocumentTypeModel.findOneAndUpdate.mockResolvedValue(
      mockUpdatedDocument,
    );

    const result = await service.update(id, updateDocumentTypeDto);

    expect(mockDocumentTypeModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      updateDocumentTypeDto,
      { new: true },
    );
    expect(result).toEqual(mockUpdatedDocument);
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = faker.string.uuid();
    mockDocumentTypeModel.findOneAndUpdate.mockResolvedValue(null);

    try {
      await service.update(id, CreateDocumentTypeDtoStub());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a documentType', async () => {
    const id = faker.string.uuid();
    const mockDeletedDocument: DocumentType = CreateDocumentTypeDtoStub();

    mockDocumentTypeModel.findByIdAndDelete.mockResolvedValue(
      mockDeletedDocument,
    );

    const result = await service.remove(id);

    expect(result).toEqual(mockDeletedDocument);
  });

  it('should throw NotFoundException when document is not found in remove service', async () => {
    const id = faker.string.uuid();
    mockDocumentTypeModel.findByIdAndDelete.mockResolvedValue(null);

    try {
      await service.remove(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
