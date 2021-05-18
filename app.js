const express = require('express');
const path = require('path')
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Localiza as variaveis de ambiente
dotenv.config({ path: './.env'});

// Instância Express
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

// Inicializa Socket IO
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Armazena as mensagens
function saveChat(id, message, data) { 
    let sqlChat = `
        INSERT INTO chat (chat_usuario_id, chat_data, chat_mensagem)
        VALUES ('${id}','${data}','${message}')
    `;
    db.query(sqlChat, async(err, result)=>{

        if(err){
            console.log(err);
        }else{
            console.log("Nova mensagem enviada");
        }

    })
}

// Instância conexão com o banco de dados
io.on('connection', socket => {
    
    // console.log('Socket Conectado:'+socket.id);

    let sqlChat = `
        SELECT chat.chat_usuario_id, chat.chat_data, chat.chat_mensagem, users.name FROM chat
        INNER JOIN users ON chat.chat_usuario_id = users.id
    `;
    db.query(sqlChat, async(err, result)=>{

        if(err){
            console.log(err);
        }else{

            for(var i = 0; i < result.length; i++){

                let msg = {
                    author: result[i].name,
                    message: result[i].chat_mensagem
                }
        
                socket.emit('previousMessage', msg);
        
            }

        }

    })

    socket.on('sendMessage', data => {
        
        saveChat(data.authorID, data.message, data.data);

        console.log(data);
        socket.broadcast.emit('receivedMessage', data);
    })
})


// Inicia servidor na porta desejada
server.listen(5000,'25.112.43.40', () => {
    console.log('Sever started on Port 5000')
})
