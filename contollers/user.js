const bcrypt = require('bcrypt');
const User = require("../models/user");
const Account = require("../models/account");
const jwt = require("jsonwebtoken");
const { cookie } = require('express/lib/response');

/**
 * @param {*} req
 * @param {*} res
 * @description home without login by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
async function getsignup(req, res) {
    try {
            res.render('pages/signUp');

    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description signUp for user by using post
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).render("pages/login", { result: {message : "you already created an account please login by it...", user : user}});
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(400).render("pages/signUp");
                } else {
                    let newUser = new User({
                        name: name,
                        email: email,
                        password: hash
                    });
                    await newUser.save();
                    console.log('newUser ::: ', newUser);
                    let user = await User.findOne({ email: email });
                    let defaultAccount = new Account({
                        userId: newUser._id,
                        name: +" Default",
                        balance: 0,
                        member : [newUser.name]
                    });
                    await defaultAccount.save();
                    console.log('DefaultAccount ::: ', defaultAccount);
                    res.status(200).render("pages/login",{ result : {message: " enter your detail here to login...!"}})
                    // return res.status(200).json({
                    //     msg: "User created successfully..."
                    // });
                }
            });
        }
    } catch (err) {
        console.log("error : ", err);
        res.status(400).json({
            msg: "error ....",
            error: err
        })
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description show userCreated in user by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function getlogin (req, res) {
    try {
        res.render('pages/login', { result : {message : "Enter Your Login Detail"}});
    } catch (err) {
        console.log("error : ", err);
        res.status(400).json({
            msg: "error ....",
            error: err
        })
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description user Login in user by using post
 * @author `DARSHAN ZignutsTechnolab`
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email : email });
        if (!user) {
            return res.status(401).render("pages/login", {result :  { message : "user not Found"}})
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {

                return res.status(401).render("login", {result :  { message : "user not Found"}});
            }
            if (result) {
                    const token = await jwt.sign(
                    {
                        email : email,
                        userId : user._id
                    },
                    "secretKey",
                    {
                        expiresIn : "20h"
                    }
                );
                // return res.status(200).render("pages/home", {result : {token: token, user: user.email}});
                await User.updateOne({email: email},{$set: {token : token}})
                console.log('token ::: ', token);

                res.cookie("jwt", token, { 
                    expires : new Date(Date.now()+ 3000000),
                    httponly: true
                });
                console.log('cookies ::: > > > ', cookie);
                return res.status(200).render("pages/home");
            }
            return res.status(401).render("pages/login", {result :  { message : "Please Enter Your Detail To Login "}})
        })
    } catch(err) {
        console.log("err in login : ", err);
        res.status(400).json({
            msg : "Unable to login, something went wrong!",
            error : err
        });
    }
};

/**
 * @param {*} req
 * @param {*} res
 * @description logout user by using delete to remove token
 * @author `DARSHAN ZignutsTechnolab`
 */
async function logout(req, res) {
    try {
        res.send('logout');
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @description user delete in user by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function deleteUser(req, res) {
    try {
        let id = req.params.userId;
        let user = await User.remove({ _id: id })
        if (user) {
            res.status(200).json({
                message: `User id number ${id} Deleted...! `
            })
        } else {
            res.status(404).json({
                message: `User id number ${id} not found that means already deleted..!`
            })
        }
    } catch (err) {
        if (err) {
            res.status(404).json({
                message: 'problem in delete a record..!'
            })
        }
    }
}


module.exports = { getsignup, signUp, getlogin, loginUser, logout, deleteUser };