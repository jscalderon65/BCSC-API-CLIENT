import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientDocument } from '../../client/schemas/client.schema';
import { mongoDb } from '../../utils/constants/mongoDb';
import { BankingAccountTypeDocument } from '../../banking_account_type/schemas/banking_account_type.schema';

const { CLIENT, BANKING_ACCOUNT_TYPE } = mongoDb.SCHEMA_NAMES;

export type BankingAccountDocument = BankingAccount & Document;

@Schema({ timestamps: true })
export class BankingAccount {
  @Prop({ required: true })
  account_number: string;

  @Prop({ type: Types.ObjectId, ref: BANKING_ACCOUNT_TYPE, required: true })
  account_type_id: Types.ObjectId | BankingAccountTypeDocument;

  @Prop({ required: true })
  available_balance: number;

  @Prop({ type: Types.ObjectId, ref: CLIENT, required: true })
  client_id: Types.ObjectId | ClientDocument;
}

export const BankingAccountSchema =
  SchemaFactory.createForClass(BankingAccount);
