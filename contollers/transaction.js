const bcrypt = require('bcrypt');
const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

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

/**
* @param {*} req
* @param {*} res
* @description addtransaction Detail By using post 
* @author `DARSHAN ZignutsTechnolab`
*/
async function addTransaction(req, res) {
    try {
    
    res.send(' addTransaction work in progress...');
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description getUpdateTransaction Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function getUpdateTransaction(req, res) {
    try {
     res.send("getUpdateTransaction work in progress...");
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description updateTransaction Detail by using patch
 * @author `DARSHAN ZignutsTechnolab`
 */
async function updateTransaction(req, res) {
    try {
        res.send(" updateTransaction work in progress...");
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description deleteTransaction Detail by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function deleteTransaction(req, res) {
    try {
        res.send(" deleteTransaction work in progress...");
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

    module.exports = { getAllTransaction, getAddTransaction, addTransaction, getUpdateTransaction, updateTransaction, deleteTransaction };