const express = require("express");
const router = express.Router();
const Account = require("../models/account");
const authorise = require("../middleware/check_auth");
const User = require("../models/user");
const { getAllAccount, getAddAccount } = require("../contollers/account");

router.get("/", authorise, getAllAccount);

router.get("/addAccount", authorise, getAddAccount);

router.post("/addAccount", authorise, async function (req, res) {
    try {
        let { userId, name } = req.body;
        let newAccount = new Account({
            userId: userId,
            name: name,
            members: [userId]
        });
        await newAccount.save();

        return res.status(200).json({
            msg: "success",
            newAccount: newAccount
        });

    } catch (err) {
        console.log("err in create account :: ", err);
        return res.status(400).json({
            msg: 'Something went wrong in create account!'
        });
    }
});

// update account 
router.patch("/:accountId", authorise, async function (req, res) {
    try {
        let accountId = req.params.accountId;
        let { updatedName } = req.body;
        let account = await Account.updateOne({ _id: accountId }, { $set: { name: updatedName } }, { new: true });
        return res.status(200).json({
            msg: "success",
            account: account
        });
    } catch (err) {
        console.log("err in edit account : ", err);
        return res.status(400).json({
            msg: 'Something went wrong in upudate account!'
        });
    }
});

// delete account 
router.delete("/:accountId", authorise, async function (req, res) {
    try {
        let accountId = req.params.accountId;
        let deleteAccount = await Account.deleteOne({ _id: accountId });

        return res.status(200).json({
            msg: "success",
            deleteAccount: deleteAccount
        });

    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong in delete account!'
        });
    }
});


module.exports = router;