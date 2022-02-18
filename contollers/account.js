const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

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
            return res.status(200).render("pages/allAccount", { account: account, msg : null });
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
        let id = mongoose.Types.ObjectId(req.userData.userId);
        const add = new Account({
            userId: id,
            name: name,
            members: [id]
        });
        await add.save();

        const accounts = await Account.find({ userId: id });
        res.render("pages/allAccount", { account: accounts, msg : null });
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
        const id  =  req.params.id;
        const account =  await Account.findOne({_id: id});
        res.render("pages/update",{account : account, msg : null});
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
        const update = await Account.findOneAndUpdate({_id : id},{$set: {name : name}});
        await update.save();
        let data =  await Account.find({userId : update.userId});
        if(data){
            console.log('account detail ::: > > >', data);
            return res.status(200).render("pages/allAccount", { account: data, msg : null});
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
 * @description deleteAccount Detail by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
async function deleteAccount(req, res) {
    try {
        let data = await Account.findOne({_id : req.params.id});
        if(data.isDefault == false){
            await Account.remove({_id : data._id});
            res.redirect("/account" );
        }
        else{
            return res.render("pages/allAccount",{msg : "default"});
        }
    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
}

module.exports = { getAllAccount, getAddAccount, addAccount, getUpdateAccount, updateAccount, deleteAccount };