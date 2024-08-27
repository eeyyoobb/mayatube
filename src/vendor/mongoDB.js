'use server';
import mongoose from 'mongoose';

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
