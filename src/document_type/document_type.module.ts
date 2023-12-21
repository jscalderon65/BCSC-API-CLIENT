import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { DocumentTypeController } from './document_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentType,
  DocumentTypeSchema,
} from './schemas/document_type.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentType.name, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
