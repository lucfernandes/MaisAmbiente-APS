const express = require('express');
const app = express();
const path = require('path');

// Set Host e Porta
const hostname = '25.112.43.40';
const PORT = 80;

// Use bodyParser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Set pasta public para os arquivos do front
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'public'));

// Set HTML como engine principal
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Busco as rotas definidas
const routes = require('./App/routes.js');

// Utiliza as rotas declaradas
app.use('/', routes);


// Importa HTTP e cria o servidor
const server = require('http').createServer(app);

const io = require('socket.io')(server);

// Array que guardará as mensagens do chat
let messages = [];

// Inicia conexão com o Socket
io.on('connection', socket => {
    console.log('Socket Conectado:'+socket.id);

    // Envia as mensagens previamente registradas para o cliente
    socket.emit('previousMessage', messages);

    // Recebe as novas mensagens do cliente e repassa para os outros clientes.
    socket.on('sendMessage', data => {
        messages.push(data);
        console.log(data);
        socket.broadcast.emit('receivedMessage', data);
    })
})



// Inicia servidor
app.listen(PORT, hostname);
