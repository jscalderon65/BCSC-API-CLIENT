import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankingAccountService } from './banking_account.service';
import { CreateBankingAccountDto } from './dto/create-banking_account.dto';
import { UpdateBankingAccountDto } from './dto/update-banking_account.dto';

@Controller('banking-account')
export class BankingAccountController {
  constructor(private readonly bankingAccountService: BankingAccountService) {}

  @Post()
  create(@Body() createBankingAccountDto: CreateBankingAccountDto) {
    return this.bankingAccountService.create(createBankingAccountDto);
  }

  @Get()
  findAll() {
    return this.bankingAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankingAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankingAccountDto: UpdateBankingAccountDto) {
    return this.bankingAccountService.update(+id, updateBankingAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankingAccountService.remove(+id);
  }
}
