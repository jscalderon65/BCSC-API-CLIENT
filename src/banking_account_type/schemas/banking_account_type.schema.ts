import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BankingAccountTypeDocument = DocumentType & Document;

@Schema({ timestamps: true })
export class BankingAccountType {
  @Prop({ required: true, unique: true })
  name: string;
}

export const BankingAccountTypeSchema =
  SchemaFactory.createForClass(BankingAccountType);
