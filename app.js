'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Rutas
const user_routes = require('./routes/user');

//middleware de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar CORS y headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas body-parser
app.use('/api',user_routes);

module.exports = app;