import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  BankingAccount,
  BankingAccountDocument,
} from '../../banking_account/schemas/banking_account.schema';
import { City, CityDocument } from '../../city/schemas/city.schema';
import { DocumentTypeDocument } from '../../document_type/schemas/document_type.schema';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: Types.ObjectId, ref: DocumentType.name, required: true })
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

  @Prop({ type: Types.ObjectId, ref: City.name, required: true })
  city_id: Types.ObjectId | CityDocument;

  @Prop({ type: Types.ObjectId, ref: BankingAccount.name, required: true })
  account_id: Types.ObjectId | BankingAccountDocument;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
