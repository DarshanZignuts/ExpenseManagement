const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Account = require('../models/account');

module.exports = async(req, res, next) => {
    try{
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, 'secretKey');
        console.log('heyy decoded :::',decoded);
        const user =  await User.findOne({token : token});
        const account = await Account.find({userId : user._id});
        console.log('account :: ><>', account);
        res.locals.account = account;
        next();
    }catch(err){
        return res.status(400).json({
            message: 'auth failed...!.'
        })
    }
};