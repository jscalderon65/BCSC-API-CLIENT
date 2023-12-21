import { Req } from '@nestjs/common';
import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document_type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../utils/pipes/parse-object-id-pipe.pipe';
@Controller('document-type')
@ApiTags('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypeService.create(createDocumentTypeDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.documentTypeService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.documentTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
  ) {
    return this.documentTypeService.update(id, updateDocumentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.documentTypeService.remove(id);
  }
}
