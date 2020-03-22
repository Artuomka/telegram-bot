const mongo = require('mongodb').MongoClient;
const dbURL = 'mongodb://TestUser:testpassword123@ds125723.mlab.com:25723/heroku_l1hh87r1';
const dbName = 'heroku_l1hh87r1';
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
