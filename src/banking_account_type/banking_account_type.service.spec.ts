import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { CreateBankingAccountTypeStub } from '../utils/stubs/bankingAccountType.stub';
import { BankingAccountType } from './schemas/banking_account_type.schema';
import { BankingAccountTypeService } from './banking_account_type.service';
import { mongoDb } from '../utils/constants/mongoDb';

const { BANKING_ACCOUNT } = mongoDb.SCHEMA_NAMES;

describe('bankingAccountTypeService', () => {
  let service: BankingAccountTypeService;

  const mockDocumentBankingAccountType = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankingAccountTypeService,
        {
          provide: getModelToken(BANKING_ACCOUNT),
          useValue: mockDocumentBankingAccountType,
        },
      ],
    }).compile();

    service = module.get<BankingAccountTypeService>(BankingAccountTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a bankingAccountType', async () => {
    const createDocumentDto = CreateBankingAccountTypeStub();

    const mockCreatedBankingAccountType: BankingAccountType = {
      name: createDocumentDto.name,
    };

    mockDocumentBankingAccountType.create.mockResolvedValue(
      mockCreatedBankingAccountType,
    );

    const result = await service.create(createDocumentDto);

    expect(mockDocumentBankingAccountType.create).toHaveBeenCalledWith(
      createDocumentDto,
    );

    expect(result).toEqual(mockCreatedBankingAccountType);
  });

  it('should find all bankingAccountTypes', async () => {
    const mockQuery = {};
    const mockFoundBankingAccountTypes: BankingAccountType[] = [
      CreateBankingAccountTypeStub(),
      CreateBankingAccountTypeStub(),
    ];

    mockDocumentBankingAccountType.find.mockResolvedValue(
      mockFoundBankingAccountTypes,
    );

    const result = await service.findAll({ query: mockQuery } as any);

    expect(result).toEqual(mockFoundBankingAccountTypes);
  });

  it('should find one bankingAccountType by id', async () => {
    const id = faker.string.uuid();
    const mockFoundBankingAccountType: BankingAccountType =
      CreateBankingAccountTypeStub();

    mockDocumentBankingAccountType.findById.mockResolvedValue(
      mockFoundBankingAccountType,
    );

    const result = await service.findOne(id);

    expect(result).toEqual(mockFoundBankingAccountType);
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = faker.string.uuid();
    mockDocumentBankingAccountType.findById.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a bankingAccountType', async () => {
    const id = faker.string.uuid();
    const updateBankingAccountTypeDto = CreateBankingAccountTypeStub();
    const mockUpdatedBankingAccountType: BankingAccountType =
      CreateBankingAccountTypeStub();

    mockDocumentBankingAccountType.findOneAndUpdate.mockResolvedValue(
      mockUpdatedBankingAccountType,
    );

    const result = await service.update(id, updateBankingAccountTypeDto);

    expect(
      mockDocumentBankingAccountType.findOneAndUpdate,
    ).toHaveBeenCalledWith({ _id: id }, updateBankingAccountTypeDto, {
      new: true,
    });
    expect(result).toEqual(mockUpdatedBankingAccountType);
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = faker.string.uuid();
    mockDocumentBankingAccountType.findOneAndUpdate.mockResolvedValue(null);

    try {
      await service.update(id, CreateBankingAccountTypeStub());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a bankingAccountType', async () => {
    const id = faker.string.uuid();
    const mockDeletedDocument: BankingAccountType =
      CreateBankingAccountTypeStub();

    mockDocumentBankingAccountType.findByIdAndDelete.mockResolvedValue(
      mockDeletedDocument,
    );

    const result = await service.remove(id);

    expect(result).toEqual(mockDeletedDocument);
  });

  it('should throw NotFoundException when document is not found in remove service', async () => {
    const id = faker.string.uuid();
    mockDocumentBankingAccountType.findByIdAndDelete.mockResolvedValue(null);

    try {
      await service.remove(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
