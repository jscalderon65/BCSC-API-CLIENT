import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { BankingAccountTypeService } from './banking_account_type.service';
import { CreateBankingAccountTypeDto } from './dto/create-banking_account_type.dto';
import { UpdateBankingAccountTypeDto } from './dto/update-banking_account_type.dto';
import { ParseObjectIdPipe } from '../utils/pipes/parse-object-id-pipe.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('banking-account-type')
@ApiTags('banking-account-type')
export class BankingAccountTypeController {
  constructor(
    private readonly bankingAccountTypeService: BankingAccountTypeService,
  ) {}

  @Post()
  create(@Body() createBankingAccountTypeDto: CreateBankingAccountTypeDto) {
    return this.bankingAccountTypeService.create(createBankingAccountTypeDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.bankingAccountTypeService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bankingAccountTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateBankingAccountTypeDto: UpdateBankingAccountTypeDto,
  ) {
    return this.bankingAccountTypeService.update(
      id,
      updateBankingAccountTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bankingAccountTypeService.remove(id);
  }
}
