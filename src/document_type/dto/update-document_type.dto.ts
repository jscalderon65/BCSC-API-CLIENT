import { PartialType } from '@nestjs/swagger';
import { CreateDocumentTypeDto } from './create-document_type.dto';

export class UpdateDocumentTypeDto extends PartialType(CreateDocumentTypeDto) {}
