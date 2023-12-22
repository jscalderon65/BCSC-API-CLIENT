import { Module } from '@nestjs/common';
import { BankingAccountService } from './banking_account.service';
import { BankingAccountController } from './banking_account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  schemaName,
  BankingAccountSchema,
} from './schemas/banking_account.schema';
import { ClientModule } from 'src/client/client.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: schemaName, schema: BankingAccountSchema },
    ]),
    ClientModule,
  ],
  controllers: [BankingAccountController],
  providers: [BankingAccountService],
})
export class BankingAccountModule {}
