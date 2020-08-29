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

    static addChannel ({name, description = '', created_by = '0000-00-00 00:00:00', created_at = '0000-00-00 00:00:00'} = request) {

        return new Promise(resolve => {

            Mongo.connect()
                .then(_ => {

                Mongo.insert(tableName, {name: name, description: description, created_by: created_by, created_at: created_at})

                    .then(res => {
                        resolve(res);

                        Mongo.close();
                    });

            });

        });

    }

    static updateChannel (id, {name, description = '', created_by = '0000-00-00 00:00:00', created_at = '0000-00-00 00:00:00'} = request) {

        let fields = {};

        if (name)
            fields.name = name;

        if (description)
            fields.description = description;

        if (created_by)
            fields.created_by = created_by;

        if (created_at)
            fields.created_at = created_at;

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