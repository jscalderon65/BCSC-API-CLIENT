import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { State, StateDocument } from '../../state/schemas/state.schema';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: State.name, required: true })
  state_id: Types.ObjectId | StateDocument;
}

export const CitySchema = SchemaFactory.createForClass(City);
