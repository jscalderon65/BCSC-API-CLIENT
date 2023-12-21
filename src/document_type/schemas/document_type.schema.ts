import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentTypeDocument = DocumentType & Document;

@Schema({ timestamps: true })
export class DocumentType {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);
