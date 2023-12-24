import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StateSchema } from './schemas/state.schema';
import { mongoDb } from '../utils/constants/mongoDb';

const { STATE } = mongoDb.SCHEMA_NAMES;
@Module({
  imports: [MongooseModule.forFeature([{ name: STATE, schema: StateSchema }])],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
