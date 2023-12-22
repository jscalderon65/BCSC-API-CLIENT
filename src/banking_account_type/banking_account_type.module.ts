import { Module } from '@nestjs/common';
import { BankingAccountTypeService } from './banking_account_type.service';
import { BankingAccountTypeController } from './banking_account_type.controller';
import {
  BankingAccountType,
  BankingAccountTypeSchema,
} from './schemas/banking_account_type.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankingAccountType.name, schema: BankingAccountTypeSchema },
    ]),
  ],
  controllers: [BankingAccountTypeController],
  providers: [BankingAccountTypeService],
})
export class BankingAccountTypeModule {}
