import { Module } from '@nestjs/common';
import { BankingAccountTypeService } from './banking_account_type.service';
import { BankingAccountTypeController } from './banking_account_type.controller';
import { BankingAccountTypeSchema } from './schemas/banking_account_type.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDb } from '../utils/constants/mongoDb';

const { BANKING_ACCOUNT_TYPE } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BANKING_ACCOUNT_TYPE, schema: BankingAccountTypeSchema },
    ]),
  ],
  controllers: [BankingAccountTypeController],
  providers: [BankingAccountTypeService],
})
export class BankingAccountTypeModule {}
