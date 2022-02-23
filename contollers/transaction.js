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
        let { account, user } = res.locals; // done
        // let member = { _id : account.name, email: user.email };
        let transactions = await Transaction.find({ account: accountId });
        if (!transactions) {
            return res.status(400).json({
                msg: "no data availabale"
            });
        } else {
            const memberData = await Account.find({ _id: accountId }, {});
            console.log('members <<<<<>>>>>', memberData);
            res.render("pages/transaction", { transaction: transactions,accountId: accountId, account: memberData, message: "" });
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
        let accountId = req.params.accountId;
        return res.render("pages/addTransaction", {accountId : accountId})
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
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
        console.log('req body ::::>>>>', req.body);
        const id = req.params.accountId;
        console.log("heyy acount id ", id);
        const { yesno, income, incomeTo, expenseFrom, expense, accountFrom, accountTo, transactionDescription, Amount } = req.body;
        if (yesno == "income") {
            const data = new Transaction({ account: id, type: "Income", from: income, to: incomeTo, discription: transactionDescription, amount: Amount });
            await data.save();
            res.send(' addTransaction in salary work in progress...');
        } else if (yesno == "expense") {
            const data = new Transaction({ account: id, type: "Expense", from: expenseFrom, to: expense, discription: transactionDescription, amount: Amount });
            await data.save();
            res.send(' addTransaction in expense work in progress...');

        } else if (yesno == "transfer") {
            const data = new Transaction({ account: id, type: "TransferToAccount", from: accountFrom, to: accountTo, discription: transactionDescription, amount: Amount });
            await data.save();
            res.send(' addTransaction in trasfer work in progress...');

        }

    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
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
            msg: 'Something went wrong!'
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
            msg: 'Something went wrong!'
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
            msg: 'Something went wrong!'
        });
    }
}

module.exports = { getAllTransaction, getAddTransaction, addTransaction, getUpdateTransaction, updateTransaction, deleteTransaction };