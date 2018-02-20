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
        //evitamos registros duplicados
        const findUser = await User.findOne({device: device});
        if(findUser)return res.status(200).json({url:{}});

        //creamos un nuevo usuario
        const newUser = new User();
            newUser.user_id = user_id;
            newUser.device = device;
            newUser.secret = secret;
            newUser.status = 0;
    
            await newUser.save( (err, userStored) =>{
                if(err) return res.status(200).json(err);   
            });

            const qrData = `otpauth://totp/ProShop?secret=${secret}&issuer=Club%20de%20Golf%20Ceiba`
            const url = await QRCode.toDataURL(qrData);
        
            if(!url) 
                return res.status(200).json({url: {}});
            else
                return res.status(200).json({url:url});
    },

    login: async (req,res,next) => {
        const userToken = req.body.token;
        const user_id = req.body.user_id;

        const findUser = await User.find({user_id: user_id},'secret user_id device');
        if(findUser == 0)
            return res.status(200).json({user_id: []});
        else
            var arr = findUser.filter((item)=>{
                var verified = speakeasy.totp.verify({
                    secret: item.secret,
                    encoding: 'base32',
                    token: userToken
                    });
                if(verified)
                    return true;
            });
        
        if(arr == 0)
            return res.status(400).json({user:false});
        else
            return res.status(200).json({user:{ 
                                            user_id: arr[0].user_id,
                                            device: arr[0].device,
                                        }});
    },

    delete: async (req,res,next) => {
        const device = parseInt(req.params.id);
        const findUser = await User.findOneAndRemove({device: device});
        if(findUser)return res.status(200).json({device:true});
    }

}


