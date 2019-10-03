const MongoClient = require('mongodb').MongoClient;

const DB_HOST = process.env.MONGO_HOST || 'localhost';
const DB_PORT = process.env.MONGO_PORT || '27017';
const DB_NAME = process.env.MONGO_DB || 'test';
const DB_COLLECTION = process.env.MONGO_COLLECTION || 'test';

const url = 'mongodb://' + DB_HOST + ':' + DB_PORT;

module.exports = {
    dbConnect: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, client) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        client
                    });
                }
                ;
            });
        });
    },
    dbClose: (client) => {
        return new Promise((resolve, reject) => {
            resolve(client.close());
        })

    },
    dbGetPointsWithinRange: (client, latitude, longitude, type) => {
        if (type === undefined) {
            return new Promise((resolve, reject) => {
                db = client.db(DB_NAME); //Get the "db" variable from "client"
                db.collection(DB_COLLECTION).find({
                    location: {$geoWithin: {$centerSphere: [[latitude, longitude], 10 / 3963.2]}}
                }, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve({
                            points: result, //Add more variables if you want
                            client
                        });
                    }

                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                db = client.db(DB_NAME); //Get the "db" variable from "client"
                db.collection(DB_COLLECTION).find({
                    location: {$geoWithin: {$centerSphere: [[latitude, longitude], 10 / 3963.2]}},
                    type: type
                }, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve({
                            points: result, //Add more variables if you want
                            client
                        });
                    }

                });
            });
        }
    }
}