// Require Built In Modules
const https = require('https');
const fs = require('fs');

// Require Installed Modules
const { Db } = require('./db');
const express = require('express');

// Connect to Database
const usappDb = new Db('usapp');
const DbConnect = usappDb.connect();

// Start app only when we are connected to database
DbConnect.then(_ => {

    const app = express();
    const port = 3000;

    const CreateRoutes = (tableName, _) => {

        if(typeof _.list == 'function') {

            app.get('/' + tableName, (req, res) => {
                _.list(req, res)
                    .then(_ => {
                        usappDb.close();
                    })
                    .catch(_ => {
                        usappDb.close();

                        throw _;
                    });
            });

        }

        if(typeof _.get == 'function') {
            app.get('/' + tableName + '/:id', (req, res) => {
                _.get(req, res)
                    .then(_ => {
                        usappDb.close();
                    })
                    .catch(_ => {
                        usappDb.close();

                        throw _;
                    });
            });
        }

        if(typeof _.add == 'function') {
            app.post('/' + tableName, (req, res) => {
                _.add(req, res)
                    .then(_ => {
                        usappDb.close();
                    })
                    .catch(_ => {
                        usappDb.close();

                        throw _;
                    });
            });
        }

        if(typeof _.update == 'function') {
            app.post('/' + tableName + '/:id', (req, res) => {
                _.update(req, res)
                    .then(_ => {
                        usappDb.close();
                    })
                    .catch(_ => {
                        usappDb.close();

                        throw _;
                    });
            });
        }

        if(typeof _.delete == 'function') {
            app.delete('/' + tableName + '/:id', (req, res) => {
                _.delete(req, res)
                    .then(_ => {
                        usappDb.close();
                    })
                    .catch(_ => {
                        usappDb.close();

                        throw _;
                    });
            });
        }

    }

    CreateRoutes('users', {

        list: (req, res) => {

            res.send('List of Users');

        },

        get: (req, res) => {

            res.send('User Information');

        },

        add: (req, res) => {

            res.send('Add New User');

        },

        update: (req, res) => {

            res.send('Update User');

        },

        delete: (req, res) => {

            res.send('Delete User');

        }

    });

    CreateRoutes('channels', {

        list: (req, res) => {

            res.send('List of Channels');

        },

        get: (req, res) => {

            res.send('Channel Information');

        },

        add: (req, res) => {

            res.send('Add New Channel');

        },

        update: (req, res) => {

            res.send('Update Channel');

        },

        delete: (req, res) => {

            res.send('Delete Channel');

        }

    });

    CreateRoutes('messages', {

        list: (req, res) => {

            res.send('List of Messages');

        },

        get: (req, res) => {

            res.send('Message Information');

        },

        add: (req, res) => {

            res.send('Add New Message');

        },

        update: (req, res) => {

            res.send('Update Message');

        },

        delete: (req, res) => {

            res.send('Delete Message');

        }

    });

    app.listen(port, () => {

        console.log(`Example app listening at http://localhost:${port}`)

    });

});