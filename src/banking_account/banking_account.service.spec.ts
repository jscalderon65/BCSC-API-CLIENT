import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BankingAccountService } from './banking_account.service';
import { mongoDb } from '../utils/constants/mongoDb';
import { CreateBankingAccountStub } from '../utils/stubs/bankingAccoun.stub';
import { BankingAccountTypeService } from '../banking_account_type/banking_account_type.service';
import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

const { BANKING_ACCOUNT, CLIENT } = mongoDb.SCHEMA_NAMES;

describe('bankingAccountService', () => {
  let service: BankingAccountService;
  const globalBankingAccountStub = CreateBankingAccountStub();
  const globalId = new mongoose.Types.ObjectId().toString();
  const mockDocumentBankingAccount = {
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
        BankingAccountService,
        {
          provide: getModelToken(BANKING_ACCOUNT),
          useValue: mockDocumentBankingAccount,
        },
        {
          provide: getModelToken(CLIENT),
          useValue: mockDocumentBankingAccount,
        },
        {
          provide: BankingAccountTypeService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BankingAccountService>(BankingAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a bankingAccount', async () => {
    const createDocumentDto = globalBankingAccountStub;

    await service.create(createDocumentDto);

    expect(mockDocumentBankingAccount.create).toHaveBeenCalled();
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = faker.string.uuid();
    mockDocumentBankingAccount.findById().populate.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = faker.string.uuid();
    mockDocumentBankingAccount
      .findOneAndUpdate()
      .populate.mockResolvedValue(null);

    try {
      await service.update(id, globalBankingAccountStub);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw NotFoundException when document is not found in remove service', async () => {
    const id = faker.string.uuid();
    mockDocumentBankingAccount
      .findByIdAndDelete()
      .populate.mockResolvedValue(null);

    try {
      await service.remove(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
