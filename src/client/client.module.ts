import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientSchema } from './schemas/client.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDb } from '../utils/constants/mongoDb';

const { CLIENT } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([{ name: CLIENT, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
