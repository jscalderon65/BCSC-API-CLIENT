import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Client, ClientDocument } from './schemas/client.schema';
import { messages } from '../utils/constants/messages';
import { mongoDb } from '../utils/constants/mongoDb';
import { CityService } from '../city/city.service';
import { DocumentTypeService } from '../document_type/document_type.service';
import { EntityRelationship } from '../interfaces/validations.interface';
import { BankingAccountService } from '../banking_account/banking_account.service';
import { CreateBankingAccountDto } from '../banking_account/dto/create-banking_account.dto';
import { BankingAccount } from '../banking_account/schemas/banking_account.schema';

const { BANKING_ACCOUNT, CITY, DOCUMENT_TYPE, CLIENT } = mongoDb.SCHEMA_NAMES;

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;
@Injectable()
export class ClientService {
  private readonly entityName: string = CLIENT;
  private readonly globalPopulatePath = [
    { path: 'document_type_id' },
    { path: 'city_id' },
  ];

  constructor(
    @InjectModel(CLIENT)
    private readonly clientModel: Model<ClientDocument>,
    private readonly cityService: CityService,
    private readonly documentTypeService: DocumentTypeService,
    private readonly bankingAccountService: BankingAccountService,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const errors: string[] = [];
    const entityServiceValidations = {
      [CITY]: this.cityService,
      [DOCUMENT_TYPE]: this.documentTypeService,
      [BANKING_ACCOUNT]: this.bankingAccountService,
      [CLIENT]: this,
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

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const entityIds: EntityRelationship[] = [
      {
        entityName: CITY,
        id: createClientDto.city_id,
      },
      {
        entityName: DOCUMENT_TYPE,
        id: createClientDto.document_type_id,
      },
    ];
    await this.isValidEntityRelationshipsId(entityIds);
    const newClient = await this.clientModel.create(createClientDto);
    return this.findOne(newClient._id);
  }

  findAll(request: Request): Promise<Client[]> {
    return this.clientModel
      .find(request.query)
      .populate(this.globalPopulatePath);
  }

  async findOne(id: string) {
    const client = await this.clientModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!client) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel
      .findOneAndUpdate({ _id: id }, updateClientDto, {
        new: true,
      })
      .populate(this.globalPopulatePath);
    if (!client) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return client;
  }

  async remove(id: string) {
    const client = await this.clientModel
      .findByIdAndDelete(id)
      .populate(this.globalPopulatePath);
    if (!client) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    const accounts = await this.bankingAccountService.findAllByClient(id);
    const removedAccounts =
      await this.bankingAccountService.removeAllClientAccounts(id);

    return { client, accounts, removedAccounts };
  }

  async createBankingAccountForClient(
    CreateBankingAccountDto: CreateBankingAccountDto,
  ): Promise<BankingAccount> {
    const entityIds: EntityRelationship[] = [
      {
        entityName: CLIENT,
        id: CreateBankingAccountDto.client_id,
      },
    ];
    await this.isValidEntityRelationshipsId(entityIds);
    return this.bankingAccountService.create(CreateBankingAccountDto);
  }
}
