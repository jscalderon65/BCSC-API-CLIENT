import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StateSchema } from './schemas/state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
