const mongo = require('mongodb').MongoClient;
const dbURL = 'mongodb://127.0.0.1:27017/';
const dbName = 'my_db';
const collectionName = 'destinitions';

class DaoMongoDB {
    constructor() {
        this.destinitionItems = [];
    }

    async createDestinetionItem(item) {
        const connection = await mongo.connect(dbURL);
        const db         = await connection.db(dbName);
        const collection = await db.createCollection(collectionName);
        collection.insertOne(item);
        connection.close();
        return (true);
    }

    async readDestinationItems() {
        const connection  = await mongo.connect(dbURL);
        const db          = await connection.db(dbName);
        const collection  = await db.createCollection(collectionName);
        let dbArray       = await collection.find({}).toArray();
        this.destinitionItems = dbArray;
        connection.close();
        return this.destinitionItems;
    }
}
module.exports = DaoMongoDB;
