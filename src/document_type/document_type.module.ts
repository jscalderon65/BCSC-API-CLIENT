import { Module } from '@nestjs/common';
import { DocumentTypeController } from './document_type.controller';
import { DocumentTypeService } from './document_type.service';

@Module({
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
