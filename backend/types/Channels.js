'use strict';

const { Db } = require('./../Db');

let Mongo = new Db('usapp');

let tableName = 'channels';

class Channels {

    static createRoutes (app, callback) {

        app.get (`/${tableName}`, callback);

        app.get (`/${tableName}/:id`, callback);

        app.post (`/${tableName}`, callback);

        app.post (`/${tableName}/:id`, callback);

        app.delete (`/${tableName}/:id`, callback);

    }

    static getAllChannels () {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.findAll(tableName)

                    .then(channels => {
                        resolve(channels);

                        Mongo.close();
                    });

            });

        });

    }

    static getChannel (id) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.findOne(tableName, id)

                    .then(channel => {
                        resolve(channel);

                        Mongo.close();
                    });

            });

        });

    }

    static addChannel (request) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.insert(tableName, request)

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

    static updateChannel (id, request) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.update(tableName, request, {id: id})

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

    static deleteChannel (id) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.delete(tableName, {id: id})

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

}

module.exports = {
    Channels: Channels
}