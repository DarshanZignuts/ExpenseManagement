const bcrypt = require('bcrypt');
const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const jwt = require("jsonwebtoken");
const { cookie } = require('express/lib/response');

/**
 * @param {*} req
 * @param {*} res
 * @description getAllAccount Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getAllAccount(req, res) {
    try {
        const { account } = res.locals;
        if(account){
            console.log('account detail ::: > > >', account);
            return res.status(200).render("pages/allAccount", { account: account });
        }
        else {
            return res.status(400).json({
                msg: 'someThing wrong to fetch local form auth detail'
            });
        }
    } catch (err) {
        return res.status(400).json({
            msg: 'someThing wrong to fetch account detail'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description getAddAccount Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getAddAccount(req, res) {
    try {
        const { account } = res.locals;
        const transaction = await Transaction.find({account : account._id});
        res.render("pages/addAccount")
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}


module.exports = { getAllAccount, getAddAccount };