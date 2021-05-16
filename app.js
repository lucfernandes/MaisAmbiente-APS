const express = require('express');
const path = require('path')
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Localiza as variaveis de ambiente
dotenv.config({ path: './.env'});

const app = express();

// Conecta com o banco de dados
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE
});

// Define pasta public
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

// Permite o express receber dados do formulário HTML 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

// Define a view engine do express como "hbs"
app.set('view engine','hbs');

db.connect(err => {
    if(err){
        console.log(err)
    }else{
        console.log('MySQL Connected...')
    }
})

// Define as rotas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/data', require('./routes/data'));

// Inicia servidor na porta desejada
app.listen(5000,'25.112.43.40', () => {
    console.log('Sever started on Port 5000')
})
