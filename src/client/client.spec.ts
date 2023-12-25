import { Test, TestingModule } from '@nestjs/testing';
import { mongoDb } from '../utils/constants/mongoDb';
import { CreateBankingAccountStub } from '../utils/stubs/bankingAccoun.stub';
import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ClientService } from './client.service';
import { CreateClientDtoStub } from '../utils/stubs/client.stub';
import { CityService } from '../city/city.service';
import { DocumentTypeService } from '../document_type/document_type.service';
import { BankingAccountService } from '../banking_account/banking_account.service';
import { getModelToken } from '@nestjs/mongoose';

const { CLIENT, BANKING_ACCOUNT } = mongoDb.SCHEMA_NAMES;

describe('clientAccountService', () => {
  let service: ClientService;
  const globalBankingAccountStub = CreateBankingAccountStub();
  const globalId = new mongoose.Types.ObjectId().toString();
  const mockDocumentClient = {
    create: jest.fn().mockImplementation(() => {
      return { _id: globalId, ...globalBankingAccountStub };
    }),
    find: () => ({
      populate: jest.fn(),
    }),
    findById: () => ({
      populate: jest.fn().mockImplementation(() => {
        return {};
      }),
    }),
    findOneAndUpdate: () => ({
      populate: jest.fn().mockImplementation(() => {
        return {};
      }),
    }),
    findByIdAndDelete: () => ({
      populate: jest.fn().mockImplementation(() => {
        return {};
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getModelToken(CLIENT),
          useValue: mockDocumentClient,
        },
        {
          provide: getModelToken(BANKING_ACCOUNT),
          useValue: mockDocumentClient,
        },
        {
          provide: CityService,
          useValue: mockDocumentClient,
        },
        {
          provide: DocumentTypeService,
          useValue: mockDocumentClient,
        },
        {
          provide: BankingAccountService,
          useValue: mockDocumentClient,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = faker.string.uuid();
    mockDocumentClient.findById().populate.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = faker.string.uuid();
    mockDocumentClient.findOneAndUpdate().populate.mockResolvedValue(null);

    try {
      await service.update(id, CreateClientDtoStub('', ''));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
