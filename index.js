'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const server = require('http').Server(app);
const config = require('./configuration/config');

// socket con cors
const io = require('socket.io')(server, {
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

mongoose.Promise = global.Promise;
mongoose.connect(config.db,{ useMongoClient: true})
    .then(() => {
          console.log('Conexión satisfactoria..');
          server.listen(config.port,() =>{
              console.log(`Server on port ${config.port}...`);
          });
    })
    .catch(err => console.log(err));
