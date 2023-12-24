import { CreateBankingAccountDto } from './dto/create-banking_account.dto';
import { UpdateBankingAccountDto } from './dto/update-banking_account.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BankingAccount,
  BankingAccountDocument,
  BankingAccountName,
} from './schemas/banking_account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from '../utils/constants/messages';
import { Request } from 'express';
import { ClientService } from '../client/client.service';
import { mongoDb } from '../utils/constants/mongoDb';

const { CLIENT } = mongoDb.SCHEMA_NAMES;

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;

@Injectable()
export class BankingAccountService {
  private readonly entityName: string = BankingAccountName;

  constructor(
    @InjectModel(BankingAccountName)
    private readonly BankingAccountModel: Model<BankingAccountDocument>,
    private readonly clientService: ClientService,
  ) {}

  async isValidClientId(ClientId: string): Promise<boolean> {
    try {
      const Client = await this.clientService.findOne(ClientId);
      return !!Client;
    } catch (error) {
      return false;
    }
  }

  async create(
    createBankingAccountDto: CreateBankingAccountDto,
  ): Promise<BankingAccount> {
    const ClientValidation = await this.isValidClientId(
      createBankingAccountDto.client_id,
    );
    if (!ClientValidation) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(
          CLIENT,
          createBankingAccountDto.client_id,
        ),
      );
    }
    const newBankingAccount = await this.BankingAccountModel.create(
      createBankingAccountDto,
    );

    return this.findOne(newBankingAccount._id);
  }

  findAll(request: Request): Promise<BankingAccount[]> {
    return this.BankingAccountModel.find(request.query).populate('client_id');
  }

  async findOne(id: string) {
    const BankingAccount =
      await this.BankingAccountModel.findById(id).populate('client_id');
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
    ).populate('client_id');
    if (!BankingAccount) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return BankingAccount;
  }

  async remove(id: string) {
    const BankingAccount =
      await this.BankingAccountModel.findByIdAndDelete(id).populate(
        'client_id',
      );
    if (!BankingAccount) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return BankingAccount;
  }
}
