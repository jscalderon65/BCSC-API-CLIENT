import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentTypeModule } from './document_type/document_type.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/interceptors/global-exception.interceptor';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { BankingAccountTypeModule } from './banking_account_type/banking_account_type.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/BCSC-CLIENT'),
    DocumentTypeModule,
    StateModule,
    CityModule,
    BankingAccountTypeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
