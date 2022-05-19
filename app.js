//require("./config/database").connect();

// Cargamos los módulos de express y body-parser
const express = require("express");
const bodyParser = require('body-parser');

// Llamamos a express para poder crear el servidor
const app = express();

// Importamos las rutas
var user_routes = require('./routes/user');

//cargar middlewares
//un metodo que se ejecuta antes que llegue a un controlador
//Configuramos bodyParser para que convierta el body de nuestras 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cargamos las rutas
app.use('/api', user_routes);

// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;