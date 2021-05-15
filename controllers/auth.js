const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const {name_user, user, password, password_confirm} = req.body;

    db.query("SELECT user FROM users WHERE user = ?", [user], async (err, result)=>{
        if(err) {
            console.log(err);
        }

        if(result.length > 0){
            return res.render('cadastro', {
                message: 'Usuário já existente :(',
                code: 400,
            })
        }else if(password !== password_confirm){
            return res.render('cadastro', {
                message: 'As senhas não conferem :(',
                code: 400
            })
        }


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("INSERT INTO users SET ?", {name: name_user, user: user, pwd: hashedPassword}, (err, result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result)
                return res.render('login', {
                    message: 'Usuário registrado com sucesso',
                    code: 200
                })
            }
        })

    })

}

exports.login = async (req, res) => {

    console.log(req.body)

    try {
        
        const { user , pwd } = req.body;

        if(!user || !pwd) {
            return res.status(400).render('login', {
                message: 'Insira seu usuário e senha corretamente ;D',
                code: 400
            })
        }

        db.query('SELECT * FROM users WHERE user = ?', [user], async (err, results) => {

            if(results.length == 0){
                return res.status(401).render('login',{
                    message: 'Usuário ou Senha incorretos :(',
                    code: 400
                })
            }
            if(!results || !(await bcrypt.compare(pwd, results[0].pwd)) ){
                res.status(401).render('login',{
                    message: 'Usuário ou Senha incorretos :(',
                    code: 400
                })
            }else{
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                console.log("The token is: "+token)

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/dashboard");
            }

        })

    } catch (err) {
        console.log(err);
    }

}
