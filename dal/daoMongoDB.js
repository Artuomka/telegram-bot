const mongo          = require('mongodb').MongoClient;
const config         = require('../config.json');
const dbURL          = config.development.database_url;
const dbName         = config.development.database_name;
const collectionName = config.development.database_collection_name;


async function createDestinetionItem(item) {
  const connection = await mongo.connect(dbURL);
  const db         = await connection.db(dbName);
  const collection = await db.createCollection(collectionName);
  await collection.insertOne(item);
  await connection.close();
  return true;
}

async function readDestinationItems() {
  const connection     = await mongo.connect(dbURL);
  const db             = await connection.db(dbName);
  const collection     = await db.createCollection(collectionName);
  let destinitionItems = await collection.find({}).toArray();
  await connection.close();
  return destinitionItems;
}


module.exports = {createDestinetionItem, readDestinationItems};
