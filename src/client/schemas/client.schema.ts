import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BankingAccountDocument } from '../../banking_account/schemas/banking_account.schema';
import { CityDocument } from '../../city/schemas/city.schema';
import { DocumentTypeDocument } from '../../document_type/schemas/document_type.schema';

import { mongoDb } from '../../utils/constants/mongoDb';

const { DOCUMENT_TYPE, CITY, BANKING_ACCOUNT } = mongoDb.SCHEMA_NAMES;

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: Types.ObjectId, ref: DOCUMENT_TYPE, required: true })
  document_type_id: Types.ObjectId | DocumentTypeDocument;

  @Prop({ required: true })
  document_number: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  middle_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  second_last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: CITY, required: true })
  city_id: Types.ObjectId | CityDocument;

  @Prop({ type: Types.ObjectId, ref: BANKING_ACCOUNT, required: true })
  account_id: Types.ObjectId | BankingAccountDocument;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
