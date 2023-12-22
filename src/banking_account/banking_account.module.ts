import { Module } from '@nestjs/common';
import { BankingAccountService } from './banking_account.service';
import { BankingAccountController } from './banking_account.controller';

@Module({
  controllers: [BankingAccountController],
  providers: [BankingAccountService],
})
export class BankingAccountModule {}
