const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render("index")
})

router.get('/login', (req, res)=>{
    res.render("login")
})

router.get('/cadastro', (req, res)=>{
    res.render("cadastro")
})

router.get('/dashboard', (req, res)=>{

    if(!req.cookies.jwt && !req.cookies.userLog){
        return res.status(403).redirect('/login');
    }

    let userCookie = req.cookies.userLog;

    res.status(200).render("dashboard",{
        user: userCookie.name,
        level: userCookie.userLevel,
        id: userCookie.id
    });
})

module.exports = router;
