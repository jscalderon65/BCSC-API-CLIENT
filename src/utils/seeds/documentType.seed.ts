import {
  DocumentType,
  DocumentTypeDocument,
  DocumentTypeSchema,
} from '../../document_type/schemas/document_type.schema';
import { credentials } from '../constants/credentials';
import mongoose from 'mongoose';

const MONGO_URI = credentials.MONGO_URI;

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const DocumentTypeModel = db.model<DocumentTypeDocument>(
      DocumentType.name,
      DocumentTypeSchema,
    );

    await DocumentTypeModel.deleteMany();

    console.log('Deleting data...');

    const DocumentTypesToInsert = [
      {
        _id: '658470199401dd011fab609b',
        code: 'CC',
        name: 'CC - Cédula de ciudadanía',
        createdAt: '2023-12-21T17:04:25.715Z',
        updatedAt: '2023-12-21T17:04:25.715Z',
        __v: 0,
      },
      {
        _id: '658470199401dd011fab609c',
        code: 'TI',
        name: 'TI - Tarjeta de identidad',
        createdAt: '2023-12-21T17:04:25.715Z',
        updatedAt: '2023-12-21T17:04:25.715Z',
        __v: 0,
      },
      {
        _id: '658470199401dd011fab609d',
        code: 'CE',
        name: 'CE - Cédula de extranjería',
        createdAt: '2023-12-21T17:04:25.715Z',
        updatedAt: '2023-12-21T17:04:25.715Z',
        __v: 0,
      },
      {
        _id: '658470199401dd011fab609e',
        code: 'CD',
        name: 'CD - Carnet diplomático',
        createdAt: '2023-12-21T17:04:25.715Z',
        updatedAt: '2023-12-21T17:04:25.715Z',
        __v: 0,
      },
    ];

    await DocumentTypeModel.insertMany(DocumentTypesToInsert);

    console.log('DocumentTypes data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting DocumentTypes data:', error);
    mongoose.disconnect();
  }
}

insertData();
