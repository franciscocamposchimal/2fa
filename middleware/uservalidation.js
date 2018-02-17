'use strict'

const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
 
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json({error:'Datos incorrectos'});
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    userSchema: Joi.object().keys({
      name: Joi.string().empty(),
      lastname: Joi.string().empty(),
      username: Joi.string().empty(),
      phone: Joi.number().integer().empty(),
      hc: Joi.number().integer().min(0).max(30).empty(),
      role: Joi.number().integer().min(0).empty(),
      status: Joi.number().integer().min(0).empty(),
      password: Joi.string().empty()
    })
  }
}