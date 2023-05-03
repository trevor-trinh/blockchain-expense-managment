import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
};

async function connectToDatabase() {
  const client = new MongoClient(uri, options);
  await client.connect();

  const db = client.db(process.env.MONGODB_DB); // Replace with your database name

  return { client, db };
}

export { connectToDatabase };

