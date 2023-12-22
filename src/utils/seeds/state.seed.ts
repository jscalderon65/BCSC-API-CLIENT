import {
  StateDocument,
  State,
  StateSchema,
} from 'src/state/schemas/state.schema';
import { credentials } from '../constants/credentials';
import mongoose from 'mongoose';

const MONGO_URI = credentials.MONGO_URI;

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const StateModel = db.model<StateDocument>(State.name, StateSchema);

    await StateModel.deleteMany();

    console.log('Deleting data...');

    const statesToInsert = [
      {
        _id: '6584ecca91758fb39e167431',
        name: 'Cundinamarca',
        createdAt: '2023-12-22T01:56:26.102Z',
        updatedAt: '2023-12-22T01:56:26.102Z',
        __v: 0,
      },
      {
        _id: '658536e77feeaf6413998417',
        name: 'Boyacá',
        createdAt: '2023-12-22T07:12:39.773Z',
        updatedAt: '2023-12-22T07:12:39.773Z',
        __v: 0,
      },
      {
        _id: '6585371d7ec7d082cbd3e922',
        name: 'Antioquía',
        createdAt: '2023-12-22T07:13:33.484Z',
        updatedAt: '2023-12-22T07:13:33.484Z',
        __v: 0,
      },
      {
        _id: '658537307ec7d082cbd3e924',
        name: 'Magdalena',
        createdAt: '2023-12-22T07:13:52.478Z',
        updatedAt: '2023-12-22T07:13:52.478Z',
        __v: 0,
      },
      {
        _id: '658537437ec7d082cbd3e927',
        name: 'Santander',
        createdAt: '2023-12-22T07:14:11.910Z',
        updatedAt: '2023-12-22T07:14:11.910Z',
        __v: 0,
      },
    ];

    await StateModel.insertMany(statesToInsert);

    console.log('States data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting states data:', error);
    mongoose.disconnect();
  }
}

insertData();
