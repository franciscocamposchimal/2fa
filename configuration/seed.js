'use strict'
var mongoose = require('mongoose');
var app = require('../app');
var server = require('http').Server(app);
var config = require('./config');
var User = require('../models/user');

mongoose.Promise = global.Promise;
mongoose.connect(config.db,{ useMongoClient: true})
    .then(() => {
          console.log('Conexión satisfactoria..');
          server.listen(config.port,() =>{
              console.log(`Server on port ${config.port}...`);
          });
    })
    .catch(err => console.log(err));

var user = new User({
    name: 'Admin',
    lastname: 'Admin',
    username: 'admin',
    phone: '--',
    hc: 0,
    password: 'admin2018',
    role: 1,
    status: 1
});



user.save((err,userSaved)=>{
 if(err){
     console.log(err);
     mongoose.connection.close()
     process.exit(0);
 }else{
     console.log(userSaved);
     mongoose.connection.close()
     process.exit(0);
 }
});


