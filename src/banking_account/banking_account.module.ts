import { Module } from '@nestjs/common';
import { BankingAccountService } from './banking_account.service';
import { BankingAccountController } from './banking_account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BankingAccountName,
  BankingAccountSchema,
} from './schemas/banking_account.schema';
import { ClientModule } from '../client/client.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankingAccountName, schema: BankingAccountSchema },
    ]),
    ClientModule,
  ],
  controllers: [BankingAccountController],
  providers: [BankingAccountService],
})
export class BankingAccountModule {}
