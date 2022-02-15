const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secretKey');
        console.log('heyy decoded :::',decoded);
        req.userData= decoded;
        next();
    }catch(err){
        return res.status(400).json({
            message: 'auth failed...!.'
        })
    }
};