import { CreateBankingAccountTypeDto } from './dto/create-banking_account_type.dto';
import { UpdateBankingAccountTypeDto } from './dto/update-banking_account_type.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { messages } from '../utils/constants/messages';
import {
  BankingAccountType,
  BankingAccountTypeDocument,
} from './schemas/banking_account_type.schema';
import { mongoDb } from '../utils/constants/mongoDb';

const { BANKING_ACCOUNT_TYPE } = mongoDb.SCHEMA_NAMES;

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;

@Injectable()
export class BankingAccountTypeService {
  private readonly entityName: string = BANKING_ACCOUNT_TYPE;

  constructor(
    @InjectModel(BANKING_ACCOUNT_TYPE)
    private readonly bankingAccountTypeModel: Model<BankingAccountTypeDocument>,
  ) {}

  create(
    createBankingAccountTypeDto: CreateBankingAccountTypeDto,
  ): Promise<BankingAccountType> {
    return this.bankingAccountTypeModel.create(createBankingAccountTypeDto);
  }

  findAll(request: Request): Promise<BankingAccountType[]> {
    return this.bankingAccountTypeModel.find(request.query);
  }

  async findOne(id: string) {
    const bankingAccountType = await this.bankingAccountTypeModel.findById(id);
    if (!bankingAccountType) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return bankingAccountType;
  }

  async update(
    id: string,
    updateBankingAccountTypeDto: UpdateBankingAccountTypeDto,
  ) {
    const bankingAccountType =
      await this.bankingAccountTypeModel.findOneAndUpdate(
        { _id: id },
        updateBankingAccountTypeDto,
        {
          new: true,
        },
      );
    if (!bankingAccountType) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return bankingAccountType;
  }

  async remove(id: string) {
    const bankingAccountType =
      await this.bankingAccountTypeModel.findByIdAndDelete(id);
    if (!bankingAccountType) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return bankingAccountType;
  }
}
