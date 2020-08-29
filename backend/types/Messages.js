'use strict';

const { Db } = require('./../Db');

let Mongo = new Db('usapp');

let tableName = 'messages';

class Messages {

    static createRoutes (app, callback) {

        app.get (`/${tableName}`, callback);

        app.get (`/${tableName}/:id`, callback);

        app.post (`/${tableName}`, callback);

        app.post (`/${tableName}/:id`, callback);

        app.delete (`/${tableName}/:id`, callback);

    }

    static getAllMessages () {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.findAll(tableName)

                    .then(messages => {
                        resolve(messages);

                        Mongo.close();
                    });

            });

        });

    }

    static getMessage (id) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.findOne(tableName, id)

                    .then(message => {
                        resolve(message);

                        Mongo.close();
                    });

            });

        });

    }

    static addMessage ({id_channel, id_user, message = '', unread = 1} = request) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.insert(tableName, {id_channel: id_channel, id_user: id_user, message: message, unread: unread})

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

    static updateMessage (id, {message = ''} = request) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.update(tableName, {message: message}, {id: id})

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

    static deleteMessage (id) {

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
    Messages: Messages
}