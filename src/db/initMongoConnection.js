import mongoose from 'mongoose';
import { getEnvVariable } from '../utilts/getEnvVariable.js';

export async function initMongoConnection() {
  try {
    const user = getEnvVariable('MONGODB_USER');
    const pwd = getEnvVariable('MONGODB_PASSWORD');
    const url = getEnvVariable('MONGODB_URL');
    const db = getEnvVariable('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=ClusterStart`,
    );
    console.log("DB succeffully loaded!");
  } catch (error) {
    console.log('Error:', error);
  }
}
