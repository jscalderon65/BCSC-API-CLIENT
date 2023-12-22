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
import { BankingAccountService } from './banking_account.service';
import { CreateBankingAccountDto } from './dto/create-banking_account.dto';
import { UpdateBankingAccountDto } from './dto/update-banking_account.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('banking-account')
@ApiTags('banking-account')
export class BankingAccountController {
  constructor(private readonly bankingAccountService: BankingAccountService) {}

  @Post()
  create(@Body() createBankingAccountDto: CreateBankingAccountDto) {
    return this.bankingAccountService.create(createBankingAccountDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.bankingAccountService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankingAccountService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankingAccountDto: UpdateBankingAccountDto,
  ) {
    return this.bankingAccountService.update(id, updateBankingAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankingAccountService.remove(id);
  }
}
