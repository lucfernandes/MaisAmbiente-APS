const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let con = mysql.createConnection({
    host: "",
    user: "root",
    password: "",
    database: "maisambiente"
})

router.get('/',(req,res)=>{
    res.render('index.html');
})

router.get('/login',(req,res)=>{
    res.render('login.html');
})

router.post('/login',(req,res)=>{

    const username = req.body.user;
    const pwd = req.body.password;

    con.connect(err => {
        sql = `SELECT * FROM users WHERE user = '${username}' AND pwd = '${pwd}'`;
        con.query(sql, (err, result, fields)=>{
            res.send(result);
        })
    })
})

router.get('/dashboard', (req, res)=>{
    res.render('dashboard.html')
})

module.exports = router;
