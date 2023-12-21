import { Module } from '@nestjs/common';
import { BankingAccountController } from './banking_account.controller';
import { BankingAccountService } from './banking_account.service';

@Module({
  controllers: [BankingAccountController],
  providers: [BankingAccountService],
})
export class BankingAccountModule {}
