import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document_type.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { messages } from '../utils/constants/messages';

import {
  DocumentType,
  DocumentTypeDocument,
} from './schemas/document_type.schema';
import { mongoDb } from '../utils/constants/mongoDb';

const { DOCUMENT_TYPE } = mongoDb.SCHEMA_NAMES;
const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;
@Injectable()
export class DocumentTypeService {
  private readonly entityName: string = DOCUMENT_TYPE;

  constructor(
    @InjectModel(DOCUMENT_TYPE)
    private readonly documentTypeModel: Model<DocumentTypeDocument>,
  ) {}

  async create(
    createDocumentTypeDto: CreateDocumentTypeDto,
  ): Promise<DocumentType> {
    return this.documentTypeModel.create(createDocumentTypeDto);
  }

  async findAll(request: Request): Promise<DocumentType[]> {
    return this.documentTypeModel.find(request.query);
  }

  async findOne(id: string) {
    const documentType = await this.documentTypeModel.findById(id);
    if (!documentType) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return documentType;
  }

  async update(id: string, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    const documentType = await this.documentTypeModel.findOneAndUpdate(
      { _id: id },
      updateDocumentTypeDto,
      {
        new: true,
      },
    );

    if (!documentType) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return documentType;
  }

  async remove(id: string) {
    const documentType = await this.documentTypeModel.findByIdAndDelete(id);

    if (!documentType) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return documentType;
  }
}
