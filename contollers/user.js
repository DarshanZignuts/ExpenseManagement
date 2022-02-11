const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * @param {*} req
 * @param {*} res
 * @description signUp for user by using post
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function signUp(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        console.log("user : ", user);
        if (user) {
            return res.status(400).json({
                msg: "User already registered!"
            });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        msg: "Unable to hash password!",
                        error: err
                    });
                } else {
                    let newUser = new User({
                        email: email,
                        password: hash
                    });
                    await newUser.save();

                    return res.status(200).json({
                        msg: "User created successfully..."
                    });
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
 async function showUser (req, res) {
    try {
        let id = await User.findOne({ _id: req.params.userId });
        if (id) {
            console.log("findOne data ::: ", id);
            res.status(200).json({
                msg: "success ....",
                data: id
            })
        } else {
            res.status(400).json({
                msg: "data not found ...."
            })
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
 * @description user Login in user by using post
 * @author `DARSHAN ZignutsTechnolab`
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log(" ::password ",req.body.password);
        let user = await User.findOne({ email: email });
        console.log("user : ", user);
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, respo) => {
                if (err) {
                    return res.status(404).json({
                        message: `fail to login by the given password...`
                    })
                }
                if (respo) {
                    const token = jwt.sign({
                        email: email,
                        userId: user._id
                    }, "secretKey", {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: `success to login by the given password...`,
                        token: token
                    })
                }
                return res.status(404).json({
                    message: `fail to login by the given password....#*#*#*#*#`
                })
            });
        } else {
            return res.status(404).json({
                message: `fail to login by the ${email} email`
            })
        }

    } catch (err) {
        console.log("error : ", err);
        res.status(400).json({
            msg: "error  in login ....",
            error: err
        })
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

module.exports = { signUp, showUser, loginUser, deleteUser };