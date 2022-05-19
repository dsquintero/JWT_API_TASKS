const express = require("express");
const app = express();

const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');


const database = require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', UserRouter);
app.use('/api/task', TaskRouter);

database.connect();

module.exports = app;