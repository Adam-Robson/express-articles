import { MongoClient } from "mongodb";

let db;

const connectToDb = async (i) => {

  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  db = client.db('online-writers-db');
  i();
}

export { db, connectToDb }
