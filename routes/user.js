'use strict'

const express = require('express');
const router = require('express-promise-router')();
const UserController = require('../controllers/user');


//crea un usuario
router.route('/user')
    .post(UserController.user);
//inicia sesión
router.route('/login')
    .post(UserController.login);
//Obtiene todos los usuario dependiendo de su sesión
/*router.route('/verify')
    .post(UserController.verifyToken);
//Obtiene un usuario
router.route('/user/:id')
    .get(UserController.getUser);
//Actualiza un usuario
router.route('/user/:id')
    .put(UserController.updateUser);
//Elimina un usuario
router.route('/user/:id')
    .delete(UserController.deleteUser);*/


module.exports = router;