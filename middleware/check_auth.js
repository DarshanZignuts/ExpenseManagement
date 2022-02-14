const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlYWN0MTJAZ21haWwuY29tIiwidXNlcklkIjoiNjIwYTUwZjJkZjQzMjJiMjllNjk1YWU0IiwiaWF0IjoxNjQ0ODQzMjU4LCJleHAiOjE2NDQ4NzIwNTh9._nMokIouVN6hkjn1ogCX-RaMmnm0V9MOZCVOM_8q5pE";
        const decoded = jwt.verify(token, 'secretKey');
        console.log('heyy decoded :::',decoded);
        req.userData= decoded;
        next();
    }catch(err){
        return res.status(400).json({
            message: 'auth failed...!.'
        })
    }
};