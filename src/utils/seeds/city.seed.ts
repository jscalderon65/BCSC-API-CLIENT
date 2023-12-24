import { CityDocument, CitySchema } from '../../city/schemas/city.schema';
import { credentials } from '../constants/credentials';
import mongoose from 'mongoose';
import { mongoDb } from '../constants/mongoDb';

const { CITY } = mongoDb.SCHEMA_NAMES;
const MONGO_URI = credentials.MONGO_URI;

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    // @ts-ignore
    const CityModel = db.model<CityDocument>(CITY, CitySchema);

    await CityModel.deleteMany();

    console.log('Deleting data...');

    const citiesToInsert = [
      {
        _id: '6584ecca91758fb39e167431',
        name: 'Bogotá D.C',
        state_id: '6584ecca91758fb39e167431',
        createdAt: '2023-12-22T01:56:26.102Z',
        updatedAt: '2023-12-22T01:56:26.102Z',
        __v: 0,
      },
      {
        _id: '6584ecca91758fb39e167432',
        name: 'Tunja',
        state_id: '658536e77feeaf6413998417',
        createdAt: '2023-12-22T07:12:39.773Z',
        updatedAt: '2023-12-22T07:12:39.773Z',
        __v: 0,
      },
      {
        _id: '6584ecca91758fb39e167433',
        name: 'Medellín',
        state_id: '6585371d7ec7d082cbd3e922',
        createdAt: '2023-12-22T07:13:33.484Z',
        updatedAt: '2023-12-22T07:13:33.484Z',
        __v: 0,
      },
      {
        _id: '6584ecca91758fb39e167434',
        name: 'Santa Marta',
        state_id: '658537307ec7d082cbd3e924',
        createdAt: '2023-12-22T07:13:52.478Z',
        updatedAt: '2023-12-22T07:13:52.478Z',
        __v: 0,
      },
      {
        _id: '6584ecca91758fb39e167435',
        name: 'Bucaramanga',
        state_id: '658537437ec7d082cbd3e927',
        createdAt: '2023-12-22T07:14:11.910Z',
        updatedAt: '2023-12-22T07:14:11.910Z',
        __v: 0,
      },
    ];

    await CityModel.insertMany(citiesToInsert);

    console.log('Cities data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting cities data:', error);
    mongoose.disconnect();
  }
}

insertData();
