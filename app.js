const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/expenseManager';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const ejs = require('ejs');

const userRoutes = require('./routers/users');
const accountRoutes = require('./routers/account');
const trasactionRoutes = require('./routers/transaction');

mongoose.connect(url, {
    useNewUrlParser : true
}).then(() => {
    console.log('Database connected successfully...');
}).catch(err => {
    console.log('err in database connection : ', err);
});
    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/transaction', trasactionRoutes);

app.get("/", async function addtransaction(req, res) {
    try {
        res.render("pages/addTrasaction")
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
})
    
app.listen(port, () => {
    console.log('Listenint to the port :', port);
});
