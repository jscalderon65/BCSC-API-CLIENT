import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { DocumentTypeController } from './document_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { nameSchema, DocumentTypeSchema } from './schemas/document_type.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: nameSchema, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
