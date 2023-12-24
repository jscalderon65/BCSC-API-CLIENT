import { Module } from '@nestjs/common';
import { BankingAccountService } from './banking_account.service';
import { BankingAccountController } from './banking_account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankingAccountSchema } from './schemas/banking_account.schema';
import { mongoDb } from '../utils/constants/mongoDb';
import { BankingAccountTypeModule } from '../banking_account_type/banking_account_type.module';
import { ClientSchema } from '../client/schemas/client.schema';

const { BANKING_ACCOUNT, CLIENT } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BANKING_ACCOUNT, schema: BankingAccountSchema },
      { name: CLIENT, schema: ClientSchema },
    ]),
    BankingAccountTypeModule,
  ],
  controllers: [BankingAccountController],
  providers: [BankingAccountService],
  exports: [BankingAccountService],
})
export class BankingAccountModule {}
