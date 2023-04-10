import { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';

const useMongoDB = (dbName = 'Cluster0', collName = 'expenses') => {
  const uri =
    'mongodb+srv://matcha:36matchas@cluster0.rljhymr.mongodb.net/?retryWrites=true&w=majority';
  const [client, setClient] = useState(null);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const connectDB = async () => {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const collection = client.db(dbName).collection(collName);
      setClient(client);
      setCollection(collection);
    };

    connectDB();

    return () => {
      if (client) {
        client.close();
      }
    };
  }, [client, dbName, collName]);

  const findDocuments = async (filter, options) => {
    const docs = await collection.find(filter, options).toArray();
    return docs;
  };

  const findOneDocument = async (filter, options) => {
    const doc = await collection.findOne(filter, options);
    return doc;
  };

  const insertDocument = async (doc) => {
    const result = await collection.insertOne(doc);
    return result;
  };

  const updateDocument = async (filter, update, options) => {
    const result = await collection.updateOne(filter, update, options);
    return result;
  };

  const deleteDocument = async (filter, options) => {
    const result = await collection.deleteOne(filter, options);
    return result;
  };

  return {
    client,
    collection,
    findDocuments,
    findOneDocument,
    insertDocument,
    updateDocument,
    deleteDocument,
  };
};

export default useMongoDB;
