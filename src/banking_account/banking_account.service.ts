import { CreateBankingAccountDto } from './dto/create-banking_account.dto';
import { UpdateBankingAccountDto } from './dto/update-banking_account.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BankingAccount,
  BankingAccountDocument,
} from './schemas/banking_account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from '../utils/constants/messages';
import { Request } from 'express';
import { mongoDb } from '../utils/constants/mongoDb';
import { BankingAccountTypeService } from '../banking_account_type/banking_account_type.service';
import { EntityRelationship } from '../interfaces/validations.interface';
import { faker } from '@faker-js/faker';

const { BANKING_ACCOUNT, BANKING_ACCOUNT_TYPE } = mongoDb.SCHEMA_NAMES;

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;

@Injectable()
export class BankingAccountService {
  private readonly entityName: string = BANKING_ACCOUNT;
  private readonly globalPopulatePath = [
    { path: 'account_type_id' },
    { path: 'client_id' },
  ];

  constructor(
    @InjectModel(BANKING_ACCOUNT)
    private readonly BankingAccountModel: Model<BankingAccountDocument>,
    private readonly bankingAccountTypeService: BankingAccountTypeService,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const errors: string[] = [];
    const entityServiceValidations = {
      [BANKING_ACCOUNT_TYPE]: this.bankingAccountTypeService,
    };

    for (const relation of entityIds) {
      const entityName = relation.entityName;
      const relationId = relation.id;
      try {
        await entityServiceValidations[entityName].findOne(relationId);
      } catch (error) {
        errors.push(RESPONSE_MESSAGES.NOT_FOUND_BY_ID(entityName, relationId));
      }
    }

    if (errors.length > 0) {
      throw new NotFoundException(JSON.stringify(errors));
    }
  }

  async create(
    createBankingAccountDto: CreateBankingAccountDto,
  ): Promise<BankingAccount> {
    const accountNumber = faker.finance.accountNumber(10);
    const entityIds: EntityRelationship[] = [
      {
        entityName: BANKING_ACCOUNT_TYPE,
        id: createBankingAccountDto.account_type_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);

    const newBankingAccount = await this.BankingAccountModel.create({
      ...createBankingAccountDto,
      account_number: accountNumber,
    });

    return this.findOne(newBankingAccount._id);
  }

  findAll(request: Request): Promise<BankingAccount[]> {
    return this.BankingAccountModel.find(request.query).populate(
      this.globalPopulatePath,
    );
  }

  findAllByClient(id: string): Promise<BankingAccount[]> {
    return this.BankingAccountModel.find({ client_id: id }).populate(
      this.globalPopulatePath,
    );
  }

  async findOne(id: string) {
    const BankingAccount = await this.BankingAccountModel.findById(id).populate(
      this.globalPopulatePath,
    );
    if (!BankingAccount) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return BankingAccount;
  }

  async update(id: string, updateBankingAccountDto: UpdateBankingAccountDto) {
    const BankingAccount = await this.BankingAccountModel.findOneAndUpdate(
      { _id: id },
      updateBankingAccountDto,
      {
        new: true,
      },
    ).populate(this.globalPopulatePath);
    if (!BankingAccount) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return BankingAccount;
  }

  async remove(id: string) {
    const BankingAccount = await this.BankingAccountModel.findByIdAndDelete(
      id,
    ).populate(this.globalPopulatePath);
    if (!BankingAccount) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return BankingAccount;
  }

  async removeAllClientAccounts(clientId: string) {
    const result = await this.BankingAccountModel.deleteMany({
      client_id: clientId,
    });
    return result;
  }
}
