import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentTypeModule } from './document_type/document_type.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/interceptors/global-exception.interceptor';
import { StateModule } from './state/state.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/BCSC-CLIENT'),
    DocumentTypeModule,
    StateModule,
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
