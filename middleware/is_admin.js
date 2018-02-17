'use strict'

exports.isAdmin = function (req,res,next) {
    if(req.user.role != 1){
        return res.status(403).send({ message: 'Acceso restringido' });
    }
    next();
};