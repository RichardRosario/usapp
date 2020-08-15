'use strict';

const { Db } = require('./../Db');

let Mongo = new Db('usapp');

let tableName = 'users';

class Users {

    static createRoutes (app, callback) {

        app.get (`/${tableName}`, callback);

        app.get (`/${tableName}/:id`, callback);

        app.post (`/${tableName}`, callback);

        app.post (`/${tableName}/:id`, callback);

        app.delete (`/${tableName}/:id`, callback);

    }

    static getAllUsers () {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.findAll(tableName)

                    .then(users => {
                        resolve(users);

                        Mongo.close();
                    });

            });

        });

    }

    static getUser (id) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.findOne(tableName, id)

                    .then(users => {
                        resolve(users);

                        Mongo.close();
                    });

            });

        });

    }

    static addUser (request) {

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

    static updateUser (id, request) {

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

    static deleteUser (id) {

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
    Users: Users
}