const bcrypt = require('bcrypt');
const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const jwt = require("jsonwebtoken");
const { cookie } = require('express/lib/response');

/**
 * @param {*} req
 * @param {*} res
 * @description getAllTransaction Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getAllTransaction(req, res) {
    try {
        let accountId = req.params.accountId;
        let transactions = await Transaction.find({ account: accountId });
        if (!transactions) {
            return res.status(400).json({
                msg: "no data availabale"
            });
        } else {
            res.render("pages/transaction", {transaction: transactions})
        }
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong in get transactions!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description getAddTransaction Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getAddTransaction(req, res) {
    try {
     res.render("pages/addTransaction")
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

    module.exports = { getAllTransaction,getAddTransaction };