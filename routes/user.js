'use strict'

const express = require('express');
const router = require('express-promise-router')();
const UserController = require('../controllers/user');


//crea un usuario
router.route('/login')
    .post(UserController.logIn);
//inicia sesión
router.route('/qr')
    .post(UserController.qr);
//Obtiene todos los usuario dependiendo de su sesión
router.route('/verify')
    .post(UserController.verifyToken);
//Obtiene un usuario
router.route('/user/:id')
    .get(UserController.getUser);
//Actualiza un usuario
router.route('/user/:id')
    .put(UserController.updateUser);
//Elimina un usuario
router.route('/user/:id')
    .delete(UserController.deleteUser);


module.exports = router;