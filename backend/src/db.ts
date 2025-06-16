import { MongoClient, Db, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let db: Db;

export async function initDB() {
  const uri = process.env.MONGO_URI!;
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();              // default db from URI
  console.log('------ MongoDB connected -------');
}

export const getDB = (): Db => {
  if (!db) throw new Error('DB has not been initialised');
  return db;
};

export { ObjectId };
