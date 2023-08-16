import {config} from "../utils";

import mongoose from 'mongoose';

const mongoUri = `${config('db.connection')}://${config('db.host')}`;

const options = {
    autoIndex: true,
    autoCreate: true,
    user: config('db.username'),
    pass: config('db.password'),
    dbName: config('db.database')
};

mongoose.connect(mongoUri, options)
    .then(() => {
        console.log("Mongo connection")
    })
    .catch((err) => {
        console.log("Mongo connection failed")
        console.log(mongoUri)
    });

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log("Mongo is disconnected")
});

db.on('error', (err) => {
    console.log(err);
});

module.exports = db;