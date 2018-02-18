'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const mongoose = require('mongoose');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

//modelos
const User = require('../models/user');

//servicio jwt
const jwt = require('../services/jwt');

//acciones
module.exports = {
    user: async (req,res,next) => {
        //recibe el id, tel del usuario y genero su secret
        const user_id = req.body.user_id;
        const device = parseInt(req.body.device);
        const secret = speakeasy.generateSecret({length: 20}).base32;
        //creamos un nuevo usuario
        const newUser = new User();
            newUser.user_id = user_id;
            newUser.device = device;
            newUser.secret = secret;
            newUser.status = 0;
    
            await saveUser.save( (err, userStored) =>{
                if(err) return handleError(err);   
            });

            const qrData = `otpauth://totp/ProShop?secret=${secret}`
            const url = await QRCode.toDataURL(qrData);
        
            if(!url) 
                return res.status(200).json({error: 'Error'});
            else
                return res.status(200).json({url:url});
    },

    login: async (req,res,next) => {

    },

    verifyToken: async (req,res,next) => {
        // This is provided the by the user via form POST
        var userToken = req.body.token;

        // Load the secret.base32 from their user record in database
        var secret = req.body.secret;

        // Verify that the user token matches what it should at this moment
        var verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: userToken
        });

        return res.status(200).json({pass: verified});
    },

    getUser: async (req,res,next) => {


    },

    updateUser: async (req,res,next) => {
 
        
    },

    deleteUser: async (req,res,next) => {
        
    }

}


