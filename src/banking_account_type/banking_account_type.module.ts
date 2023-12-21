import { Module } from '@nestjs/common';
import { BankingAccountTypeController } from './banking_account_type.controller';
import { BankingAccountTypeService } from './banking_account_type.service';

@Module({
  controllers: [BankingAccountTypeController],
  providers: [BankingAccountTypeService],
})
export class BankingAccountTypeModule {}
