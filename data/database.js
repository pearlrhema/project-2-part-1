const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getdatabase = () => {
    if (!database) {
        throw new Error('Database not initialized. Call initDb first.');
    }
    return database;
}

module.exports = {
    initDb,
    getdatabase
};