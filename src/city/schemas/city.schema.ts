import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { StateDocument } from '../../state/schemas/state.schema';
import { mongoDb } from '../../utils/constants/mongoDb';

const { STATE } = mongoDb.SCHEMA_NAMES;
export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: STATE, required: true })
  state_id: Types.ObjectId | StateDocument;
}

export const CitySchema = SchemaFactory.createForClass(City);
