import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentTypeModule } from './document_type/document_type.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/interceptors/global-exception.interceptor';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { BankingAccountTypeModule } from './banking_account_type/banking_account_type.module';
import { credentials } from './utils/constants/credentials';
import { messages } from './utils/constants/messages';

const CONNECTION_MESSAGES = messages.CONNECTION_MESSAGES;
@Module({
  imports: [
    MongooseModule.forRoot(credentials.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          new Logger().log(CONNECTION_MESSAGES.MONGO_CORRECT_CONNECTION);
        });

        connection.on('disconnected', () => {
          new Logger().log(CONNECTION_MESSAGES.MONGO_END_CONNECTION);
        });

        connection._events.connected();
        return connection;
      },
    }),
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
