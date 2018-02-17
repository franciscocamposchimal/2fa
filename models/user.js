'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    name:{ type: String, required:[true, 'Nombre vacío, campo obligatorio']},
    lastname:{ type: String, required:[true, 'Apellido vacío, campo obligatorio']},
    username: { type: String, unique:true, required:[true,'Nombre de usuario vacío, campo obligatorio']},
    password: { type: String, required:[true, 'Password vacío, campo obligatorio']},
    role: { type: Number, required:[true, 'Campo vacío']},
    status: { type: Number, required:[true, 'Campo vacío']}
},{
    timestamps: { createdAt: 'createdAt',
                  updatedAt: 'updatedAt' }
});

UserSchema.pre('save', function (next){
    let user = this

   if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
  
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err)
  
        user.password = hash
        next()
      })
    })
  });

UserSchema.methods.comparePassword = function (pass,cb) {
 bcrypt.compare(pass, this.password, function(err, isMatch){
  if(err) return cb(err);
  cb(null, isMatch);
 });
};   

module.exports = mongoose.model('User',UserSchema);