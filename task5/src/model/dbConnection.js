const { MongoClient } = require("mongodb");
const dbConnection = callback => {
    MongoClient.connect("mongodb://localhost:27017", {}, (error, client) => {
        if (error) {
            console.log("connection error");
            return callback(error, false);
        }
        const db = client.db("mongoTask5");
        callback(false, db);
        console.log("db connected");
    });
};
module.exports = dbConnection;
