import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { DocumentTypeController } from './document_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentTypeSchema } from './schemas/document_type.schema';
import { mongoDb } from '../utils/constants/mongoDb';

const { DOCUMENT_TYPE } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DOCUMENT_TYPE, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
