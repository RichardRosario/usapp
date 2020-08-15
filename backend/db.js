'use strict';

// Use MongoDB
const mongo = require('mongodb');

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
            this.url,

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

    findAll (tableName) {
        

        return this.db.collection(tableName).find({}).toArray()
            .catch(err => {throw err});

    }

    findOne (tableName, id) {
        

        return this.db.collection(tableName).findOne({id: id}).toArray()
            .catch(err => {throw err});

    }

    insert (tableName, row) {

        return this.db.collection(tableName).insertOne(row)
            .catch(err => {throw err});

    }

    update (tableName, row, condition) {

        return this.db.collection(tableName).updateOne(condition, {$set: row})
            .catch(err => {throw err});

    }

    delete (tableName, condition) {

        return this.db.collection(tableName).deleteOne(condition)
            .catch(err => {throw err});

    }

    close () {

        this.mongo.close();

    }

}

module.exports = {
    Db: Db
}