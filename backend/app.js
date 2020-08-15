'use strict';

// Require Built In Modules
const https = require('https');
const fs = require('fs');

// Require Installed Modules
const express = require('express');
const bodyParser = require("body-parser");

const { Users } = require('./types/Users');
const { Channels } = require('./types/Channels');
const { Messages } = require('./types/Messages');

class App {

    #app;
    #port;
    #db;

    constructor () {

        this.#app = express();
        this.#port = 3001;

    }

    static getInstance () {

        let app = new App();
            app.start();

    }

    start () {

        this.createRoutes();

    }

    async createRoutes () {

        let app = this.#app;
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());

        this.createRoutesForUsers();

        this.createRoutesForChannels();

        this.createRoutesForMessages();

        app.listen(this.#port, () => {
    
            console.log(`Listening at http://localhost:${this.#port}`)
    
        });

    }

    createRoutesForUsers () {

        let app = this.#app;

        Users.createRoutes(app, async (req, res) => {

            let type = req.method;
            let params = req.params;

            let paramLength = Object.keys(params).length;

            let Output;

            switch (type) {

                case 'DELETE':

                    Output = await Users.deleteUser(params.id);

                break;

                case 'PUT':

                    res.send('No such endpoint');

                break;

                case 'POST':

                    if (paramLength) {

                        Output = await Users.updateUser(params.id, req.body);

                    } else {

                        Output = await Users.addUser(req.body);

                    }

                break;

                default:

                    if (paramLength) {

                        Output = await Users.getUser(params.id);

                    } else {

                        Output = await Users.getAllUsers();

                    }

            }

            Output = JSON.stringify(Output);

            res.send(Output);

        });

    }

    createRoutesForChannels () {

        let app = this.#app;

        Channels.createRoutes(app, async (req, res) => {

            let type = req.method;
            let params = req.params;

            let paramLength = Object.keys(params).length;

            let Output;

            switch (type) {

                case 'DELETE':

                    Output = await Channels.deleteChannel(params.id);

                break;

                case 'PUT':

                    res.send('No such endpoint');

                break;

                case 'POST':

                    if (paramLength) {

                        Output = await Channels.updateChannel(params.id, req.body);

                    } else {

                        Output = await Channels.addChannel(req.body);

                    }

                break;

                default:

                    if (paramLength) {

                        Output = await Channels.getChannel(params.id);

                    } else {

                        Output = await Channels.getAllChannels();

                    }

            }

            Output = JSON.stringify(Output);

            res.send(Output);

        });

    }

    createRoutesForMessages () {

        let app = this.#app;

        Messages.createRoutes(app, async (req, res) => {

            let type = req.method;
            let params = req.params;

            let paramLength = Object.keys(params).length;

            let Output;

            switch (type) {

                case 'DELETE':

                    Output = await Messages.deleteMessage(params.id);

                break;

                case 'PUT':

                    res.send('No such endpoint');

                break;

                case 'POST':

                    if (paramLength) {

                        Output = await Messages.updateMessage(params.id, req.body);

                    } else {

                        Output = await Messages.addMessage(req.body);

                    }

                break;

                default:

                    if (paramLength) {

                        Output = await Messages.getMessage(params.id);

                    } else {

                        Output = await Messages.getAllMessages();

                    }

            }

            Output = JSON.stringify(Output);

            res.send(Output);

        });

    }

}

App.getInstance();