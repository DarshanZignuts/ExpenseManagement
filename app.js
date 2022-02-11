const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/expenseManager';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const userRoutes = require('./routers/users');
    
    
mongoose.connect(url, {
    useNewUrlParser : true
}).then(() => {
    console.log('Database connected successfully...');
}).catch(err => {
    console.log('err in database connection : ', err);
});

//for check signup..!
app.get('/', async function fname(req, res) {
    try {
        res.render("signUp");
    } catch (err) {
        return res.status(400).json({
            msg : 'Something went wrong!'
        });
    }
})
    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/user', userRoutes);
    
    
app.listen(port, () => {
    console.log('Listenint to the port :', port);
});