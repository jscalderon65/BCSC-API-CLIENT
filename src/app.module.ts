import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { BankingAccountModule } from './banking_account/banking_account.module';
import { BankingAccountTypeModule } from './banking_account_type/banking_account_type.module';
import { DocumentTypeModule } from './document_type/document_type.module';
import { DepartmentModule } from './department/department.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ClientModule,
    BankingAccountModule,
    BankingAccountTypeModule,
    DocumentTypeModule,
    DepartmentModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
