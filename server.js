// Importa o Express e o Path para aplicação
const express = require('express');
const path = require('path');

// Instância o Express
const app = express();

// Importa HTTP e cria o servidor
const server = require('http').createServer(app);

// Instância o Socket.IO no servidor criado
const io = require('socket.io')(server);

// Registra o host e a porta que será hospedada a aplicação
const hostname = '25.112.43.40';
const port = 80;

// Set de onde estará a aplicação base
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'public'));

// Set da tecnologia utilizada para o front
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Cria a rota que será utilizada para acessar a aplicação
app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard.html')
})

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

// Hospeda a aplicação na porta e no host indicado
server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
});
