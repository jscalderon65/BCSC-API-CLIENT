import { Injectable } from '@nestjs/common';
import { CreateBankingAccountDto } from './dto/create-banking_account.dto';
import { UpdateBankingAccountDto } from './dto/update-banking_account.dto';

@Injectable()
export class BankingAccountService {
  create(createBankingAccountDto: CreateBankingAccountDto) {
    return 'This action adds a new bankingAccount';
  }

  findAll() {
    return `This action returns all bankingAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankingAccount`;
  }

  update(id: number, updateBankingAccountDto: UpdateBankingAccountDto) {
    return `This action updates a #${id} bankingAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankingAccount`;
  }
}
