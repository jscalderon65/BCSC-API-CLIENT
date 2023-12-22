import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { schemaName, CitySchema } from './schemas/city.schema';
import { StateModule } from '../state/state.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: schemaName, schema: CitySchema }]),
    StateModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
