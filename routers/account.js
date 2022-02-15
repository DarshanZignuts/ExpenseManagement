const express = require("express");
const router = express.Router();
const Account = require("../models/account");
const authorise = require("../middleware/check_auth");
const User = require("../models/user");

//open account
router.get("/",  async function (req, res) {
    try {
        // let id = await User.findOne(_id) {userId : id}.populate("User")
        let account = await Account.find();
        if (!account) {
            return res.status(400).json({
                msg: 'someThing wrong to find account detail'
            });
        } else {
            return res.status(200).render("pages/account",{account: account})
        }
    } catch (err) {
        return res.status(400).json({
            msg: 'someThing wrong to fetch account detail'
        });
    }
});

router.get("/add", authorise, async function addshow(req, res) {
    try {
        res.render("pages/addAccount")
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
})
// create account
router.post("/add", authorise, async function (req, res) {
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