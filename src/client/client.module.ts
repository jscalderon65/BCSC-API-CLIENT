import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientSchema } from './schemas/client.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDb } from '../utils/constants/mongoDb';
import { DocumentTypeModule } from '../document_type/document_type.module';
import { CityModule } from '../city/city.module';
import { BankingAccountModule } from '../banking_account/banking_account.module';

const { CLIENT } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([{ name: CLIENT, schema: ClientSchema }]),
    DocumentTypeModule,
    CityModule,
    BankingAccountModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
