const express = require("express");
const cors = require('cors');

var corsOptions = {
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}

const app = express();

const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');


const database = require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions))

app.use('/api', UserRouter);
app.use('/api/task', TaskRouter);

database.connect();

module.exports = app;