import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schemas/city.schema';
import { StateModule } from '../state/state.module';
import { mongoDb } from '../utils/constants/mongoDb';

const { CITY } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [
    MongooseModule.forFeature([{ name: CITY, schema: CitySchema }]),
    StateModule,
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
