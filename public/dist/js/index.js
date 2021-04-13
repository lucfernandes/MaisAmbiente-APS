// Conexão com o Socket IO
var socket = io('http://25.112.43.40:80');

// Rendeniza as mensagens no chat
function renderMessage(msg){
    $('.messages').append('<div class="msg"><b>'+ msg.author +'</b>: '+msg.message+'</div>');
}

// Recebe as mensagens anteriores que já haviam sido enviadas
socket.on('previousMessage', function(msgs){
    for(msg of msgs){
        renderMessage(msg);
    }
})

// Recebe as mensagens que acabaram de ser enviadas
socket.on('receivedMessage', function(msg){
    renderMessage(msg);
})

// Envia uma nova mensagem para o back-end
$('#chat').submit(function(event){
    event.preventDefault();

    var author = $('input[name=user]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length) {
        var messageObject = {
            author: author,
            message: message,
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    }
})
