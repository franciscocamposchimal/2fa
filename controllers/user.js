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
    qr: async (req,res,next) => {
        const secret = req.body.secret;

        const qrData = `otpauth://totp/ProShop?secret=${secret}`
        const url = await QRCode.toDataURL(qrData);
        
        if(!url) 
            return res.status(200).json({error: 'Error'});
        else
            return res.status(200).json({url:url});
    },

    logIn: async (req,res,next) => {
        
        const secret = speakeasy.generateSecret({length: 20}).base32;

        return res.status(200).json({secret: secret}); // Save this value to your DB for the user
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


