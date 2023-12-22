import {
  BankingAccountType,
  BankingAccountTypeDocument,
  BankingAccountTypeSchema,
} from '../../banking_account_type/schemas/banking_account_type.schema';
import { credentials } from '../constants/credentials';
import mongoose from 'mongoose';

const MONGO_URI = credentials.MONGO_URI;

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const BankingAccountTypeModel = db.model<BankingAccountTypeDocument>(
      BankingAccountType.name,
      BankingAccountTypeSchema,
    );

    await BankingAccountTypeModel.deleteMany();

    console.log('Deleting data...');

    const BankingAccountTypesToInsert = [
      {
        _id: '658470199401dd011fab6090',
        name: 'Cuenta corriente',
        createdAt: '2023-12-22T05:49:27.513Z',
        updatedAt: '2023-12-22T05:49:27.513Z',
        __v: 0,
      },
      {
        _id: '658470199401dd011fab6091',
        name: 'Cuenta amiga',
        createdAt: '2023-12-22T05:49:27.513Z',
        updatedAt: '2023-12-22T05:49:27.513Z',
        __v: 0,
      },
      {
        _id: '658470199401dd011fab6092',
        name: 'Cuenta de ahorros',
        createdAt: '2023-12-22T05:49:27.513Z',
        updatedAt: '2023-12-22T05:49:27.513Z',
        __v: 0,
      },
    ];

    await BankingAccountTypeModel.insertMany(BankingAccountTypesToInsert);

    console.log('BankingAccountTypes data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting BankingAccountTypes data:', error);
    mongoose.disconnect();
  }
}

insertData();
