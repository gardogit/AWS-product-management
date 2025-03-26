import * as dotenv from 'dotenv';
import { connectToDatabase } from './src/infrastructure/db';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const testConnection = async () => {
  try {
    await connectToDatabase();
    console.log('MongoDB connection successful!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

testConnection();
