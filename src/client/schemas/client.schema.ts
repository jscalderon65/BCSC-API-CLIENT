import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CityDocument } from '../../city/schemas/city.schema';
import { DocumentTypeDocument } from '../../document_type/schemas/document_type.schema';

import { mongoDb } from '../../utils/constants/mongoDb';

const { DOCUMENT_TYPE, CITY } = mongoDb.SCHEMA_NAMES;

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: Types.ObjectId, ref: DOCUMENT_TYPE, required: true })
  document_type_id: Types.ObjectId | DocumentTypeDocument;

  @Prop({ required: true, unique: true })
  document_number: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ default: null })
  middle_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ default: null })
  second_last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: CITY, required: true })
  city_id: Types.ObjectId | CityDocument;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
