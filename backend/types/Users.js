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

    static addUser ({name, email, password, profile_image = '', online = false} = request) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.insert(tableName, {name: name, email: email, password: password, profile_image: profile_image, online: online})

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

    static updateUser (id, {name = '', email = '', password = '', profile_image = '', online = false} = request) {

        let fields = {};

        if (name)
            fields.name = name;

        if (email)
            fields.email = email;

        if (password)
            fields.password = password;

        if (profile_image)
            fields.profile_image = profile_image;

        if (online)
            fields.online = online;

        return new Promise(resolve => {

            if (Object.keys(fields).length <= 0){
                resolve({error: 'No field to update'});

                return false;
            }

            Mongo.connect()
                .then(_ => {

                Mongo.update(tableName, fields, {id: id})

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