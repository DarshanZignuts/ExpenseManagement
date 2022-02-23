const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');


/**
 * @param {*} req
 * @param {*} res
 * @description getAllAccount Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getAllAccount(req, res) {
    try {
        const { account } = res.locals;
        if (account) {
            console.log('account detail ::: > > >', account);
            return res.status(200).render("pages/allAccount", { account: account, msg: null });
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
        // const { account } = res.locals;
        // const transaction = await Transaction.find({ account: account._id });
        res.render("pages/addAccount")
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}


/**
 * @param {*} req
 * @param {*} res
 * @description addAccount Detail by using post
 * @author `DARSHAN ZignutsTechnolab`
 */
async function addAccount(req, res) {
    try {
        const name = req.body.name;
        const { user } = res.locals;
        let id = mongoose.Types.ObjectId(req.userData.userId);
        const add = new Account({
            userId: id,
            name: name,
            members: [{ name: user.name, email: user.email, isAdmin: true }]
        });
        await add.save();

        const accounts = await Account.find({ userId: id });
        res.render("pages/allAccount", { account: accounts, msg: null });
    } catch (err) {
        console.log('err ::: <><>', err);
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description getUpdateAccount Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getUpdateAccount(req, res) {
    try {
        const id = req.params.id;
        const account = await Account.findOne({ _id: id });
        res.render("pages/update", { account: account, msg: null });
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description updateAccount Detail by using patch
 * @author `DARSHAN ZignutsTechnolab`
 */
async function updateAccount(req, res) {
    try {
        const { account } = res.locals;
        let { id, name } = req.body;
        const update = await Account.findOneAndUpdate({ _id: id }, { $set: { name: name } });
        await update.save();
        let data = await Account.find({ userId: update.userId });
        if (data) {
            console.log('account detail ::: > > >', data);
            return res.status(200).render("pages/allAccount", { account: data, msg: null });
        }
        else {
            return res.status(400).json({
                msg: 'someThing wrong to update local form auth detail'
            });
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
 * @description getUpdateAccount Detail by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getAddMember(req, res) {
    try {
        const id = req.params.id;
        const account = await Account.findOne({ _id: id });
        res.render("pages/addMember", { account: account, msg: null });
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description addMember Detail by using patch
 * @author `DARSHAN ZignutsTechnolab`
 */
async function addMember(req, res) {
    try {
        const { account } = res.locals;
        let { id, mName, mEmail } = req.body;
        let member = { name: mName, email: mEmail };
        let data = await Account.findOne({ _id: id });
        let members = data.members;
        console.log('members ::: ', members);
        let check = false;
        for (let i = 0; i < members.length; i++) {
            if (members[i].email == mEmail) {
                check = true;
                break;
            }
        }
        if (check == false) {
            const update = await Account.findOneAndUpdate({ _id: id }, { $push: { "members": member } });
            await update.save();
            var transporter = await nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "a5cee4b85d8781",
                  pass: "64d75fc684958b"
                }
              });
              let info = await transporter.sendMail({
                from: '"<smtp.mailtrap.io>', // sender address
                to: mEmail, // list of receivers
                subject: "Hello ", // Subject line
                text: "You are added in account group By expense manager user signup to join them and enjoy it..!!! ", // plain text body
                html: "<b>Welcome To Expense Manager</b>", // html body
              });
            return res.redirect("/transaction/id/" + id);
        } else {
            let transactions = await Transaction.find({ account: id });
            const memberData = await Account.find({ _id: id }, {});
            res.render("pages/transaction", { transaction: transactions, accountId: id, account: memberData, message: "already" });
        }
        // console.log(' member added  ;;;; ', update);
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}


/**
 * @param {*} req
 * @param {*} res
 * @description deleteAccount Detail by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
async function deleteMember(req, res) {
    try {
        const { account, user } = res.locals;
        const id = req.params.id;
        console.log('id ', id);
        const data = await Account.findOne({ "members._id" : id  })
        console.log('account detail in delete members ::: ><><>< ', data);
        let members = data.members;
        console.log('members ::: ', members);
        let check = false;
        for (let i = 0; i < members.length; i++) {
            // console.log('member detail :: ', members[i]);
            if (members[i]._id == id) {
                console.log('check after id check  ::: ', check);
                if (members[i].isAdmin == false) {
                    check = true;
                    break;
                }
            }
        }
        console.log('check  ::: ', check);
        if (check == true) {
            const update = await Account.findOneAndUpdate({ _id: data._id }, { $pull: { "members": { _id: id } } });
            await update.save();
            let transactions = await Transaction.find({ account: data._id });
            const memberData = await Account.find({ _id: data._id }, {});
            res.render("pages/transaction", { transaction: transactions, accountId: data._id, account: memberData, message: "already" });
        }
        else {
            let transactions = await Transaction.find({ account: data._id });
            const memberData = await Account.find({ _id: data._id }, {});
            res.render("pages/transaction", { transaction: transactions, accountId: data._id, account: memberData, message: "already" });
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
 * @description deleteAccount Detail by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
async function deleteAccount(req, res) {
    try {
        let data = await Account.findOne({ _id: req.params.id });
        if (data.isDefault == false) {
            await Account.remove({ _id: data._id });
            res.redirect("/account");
        }
        else {
            return res.render("pages/allAccount", { msg: "default" });
        }
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}

module.exports = { getAllAccount, getAddAccount, addAccount, getUpdateAccount, updateAccount, deleteAccount, getAddMember, addMember, deleteMember };