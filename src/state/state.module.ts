import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { nameSchema, StateSchema } from './schemas/state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: nameSchema, schema: StateSchema }]),
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
