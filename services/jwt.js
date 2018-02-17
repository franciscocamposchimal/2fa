'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../configuration/config');

function createToken (user){
    var payload = {
        sub: user._id,
        name: user.name,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, 'years').unix()
    };
    return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = {
    createToken
  }
  