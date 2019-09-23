const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const users = require('../users/users-model');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token,process.env.jwtSecret,(err,decodeToken) =>{
           if (err) {
               res.status(401).json({
                   message:'not verified'
               })
           } else{
               req.decodeToken = decodeToken;
                next()
           }
        });
    }else{
        res.status(400).json({
            message:'no token provided'
        })
    }
}
