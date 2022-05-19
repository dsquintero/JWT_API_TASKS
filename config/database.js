const mongoose = require("mongoose");
const config = require('./');

const { protocol, url, user, pass } = config.database;

const uri = (user && pass) ?
  `${protocol}://${user}:${pass}@${url}` :
  `${protocol}://${url}`;


mongoose.Promise = global.Promise;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};