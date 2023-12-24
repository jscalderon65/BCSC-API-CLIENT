import { Module } from '@nestjs/common';
import { BankingAccountService } from './banking_account.service';
import { BankingAccountController } from './banking_account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankingAccountSchema } from './schemas/banking_account.schema';
import { ClientModule } from '../client/client.module';
import { mongoDb } from '../utils/constants/mongoDb';

const { BANKING_ACCOUNT } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BANKING_ACCOUNT, schema: BankingAccountSchema },
    ]),
    ClientModule,
  ],
  controllers: [BankingAccountController],
  providers: [BankingAccountService],
})
export class BankingAccountModule {}
