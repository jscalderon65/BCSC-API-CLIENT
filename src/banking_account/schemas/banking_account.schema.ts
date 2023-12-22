import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Client, ClientDocument } from 'src/client/schemas/client.schema';

export type BankingAccountDocument = BankingAccount & Document;

@Schema({ timestamps: true })
export class BankingAccount {
  @Prop({ required: true })
  account_number: string;

  @Prop({ required: true })
  account_type_id: string;

  @Prop({ required: true })
  available_balance: number;

  @Prop({ type: Types.ObjectId, ref: Client.name, required: true })
  client_id: Types.ObjectId | ClientDocument;
}

export const BankingAccountSchema =
  SchemaFactory.createForClass(BankingAccount);
