const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const Account = require("../models/account");



router.get("/:accountId", async function(req, res) {
    try {
        let accountId = req.params.accountId;
        let transactions = await Transaction.findMany({ account : accountId });
        
        return res.status(200).json({
            msg : "success",
            data : transactions
        });
        
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong in get transactions!'
        });
    }
});

router.post("/:accountId", async function(req, res) {
    try {
        let { account, type, category, amount, to } = req.body;
        let newTransaction = new Transaction({
            account : account,
            type : type,
            category : category,
            amount : amount,
            to : to
        });
        await newTransaction.save();

        return res.status(200).json({
            msg : "success",
            data : newTransaction
        });

    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
});

module.exports = router;