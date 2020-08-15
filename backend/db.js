// Use MongoDB
const mongo = require('mongodb');

// Construct Database
const dbClient = mongo.MongoClient;

const dbUrl = 'mongodb://localhost:27017/usapp';

class Db {

    constructor (name) {

        this.client = mongo.MongoClient;

        this.name = name

        this.url = 'mongodb://localhost:27017/' + name;

        this.mongo = null;
        this.db = null;

    }

    connect () {

        return this.client.connect(
            dbUrl,

            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )

            .catch(error => {
                throw error;
            })

            .then(db => this.onConnect(db));

    }

    onConnect (db) {

        console.log('Connected to Database');

        this.mongo = db;

        this.db = db.db(this.name);

        this.createTable(
            'users'
        );

        this.createTable(
            'channels'
        );

        this.createTable(
            'messages'
        );

    }

    async createTable (tableName) {

        let tableExists = await this.tableExists(tableName);

        if(!!tableExists)
            return tableExists;

        this.db.createCollection(
            tableName,

            this.onCreateTable
        );
    }

    tableExists (tableName) {

        return new Promise(resolve => {

            this.db.listCollections({name: tableName})

            .next(
                (error, collectionInfo) => {

                    if(collectionInfo) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
     
                }
            );

        });

    }

    onCreateTable (error, response) {

        if (error)
            throw error;

        console.log(response);

    }

    close () {

        this.mongo.close();

    }

}

module.exports = {
    Db: Db
}

// const database = new Db();
    // database.connect();