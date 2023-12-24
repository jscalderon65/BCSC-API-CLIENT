import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientDocument } from 'src/client/schemas/client.schema';
import { mongoDb } from '../../utils/constants/mongoDb';

const { CLIENT } = mongoDb.SCHEMA_NAMES;

export type BankingAccountDocument = BankingAccount & Document;

@Schema({ timestamps: true })
export class BankingAccount {
  @Prop({ required: true })
  account_number: string;

  @Prop({ required: true })
  account_type_id: string;

  @Prop({ required: true })
  available_balance: number;

  @Prop({ type: Types.ObjectId, ref: CLIENT, required: true })
  client_id: Types.ObjectId | ClientDocument;
}

export const BankingAccountName = 'BankingAccount';

export const BankingAccountSchema =
  SchemaFactory.createForClass(BankingAccount);
