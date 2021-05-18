$(function () {

    // Pega os ultimos chamados da API
    $.get("/data/chamados", data=>{
       
        let dadosAPI = JSON.parse(data);

        $('#cardListChamados').empty();

        for(var i = 0; i < dadosAPI.length; i++){
            criaChamado(dadosAPI[i]);
        }

    });

    // Filtra dados da Home
    $('#formFilter').submit(e=>{
        e.preventDefault();

        let estadoFiltro = $('#FiltroEstado').val();
        let casoFiltro = $('#FiltroCaso').val();

        // Adiciona os parametros a URL
        let url = "/data/chamados?";
        
        if(estadoFiltro){
            url = url + `estado=${estadoFiltro}`;
        }
        if(casoFiltro){
            url = url + `caso=${casoFiltro}`
        }

        console.log(url)

        // Faz requisição com a API
        $.get(url, data => {

            console.log(data)

            $('#cardListChamados').empty();

            let dadosAPI = JSON.parse(data);

            for(var i = 0; i < dadosAPI.length; i++){
                criaChamado(dadosAPI[i]);
            }

        })

    });

    // Envia novos dados
    $('#formEditarChamado').submit((e)=>{
        e.preventDefault();

        let objNovosDados = {
            caso: $('#formEditarChamado #editarCaso').val(),
            estado: $('#formEditarChamado #editarEstado').val(),
            local: $('#formEditarChamado #editarLocal').val(),
            data: $('#formEditarChamado #editarData').val(),
        }

        objNovosDados.chamadoID = $('#formEditarChamado #chamadoID').val();

        $.ajax({
            type: "POST",
            url: '/data/editar',
            data: objNovosDados,
            success: data =>{
                if(data.status == 200){
                    alert('Chamado editado com sucesso');

                    location.reload();
                }else{
                    alert('Não foi possível editar o chamado');

                    location.reload();
                }
            }
        })

    })

    // Abre modal para criar novo chamado
    $('#criarChamadoButton').click(e => {
        e.preventDefault();

        $('#modalCriarChamado').addClass('enabled');
    })

    // Envia novo chamado
    $('#formCriarChamado').submit(e=>{
        e.preventDefault();

        let objNovosDados = {
            caso: $('#formCriarChamado #novoCaso').val(),
            estado: $('#formCriarChamado #novoEstado').val(),
            local: $('#formCriarChamado #novoLocal').val(),
            data: $('#formCriarChamado #novaData').val(),
        }

        $.ajax({
            type: "POST",
            url: '/data/criar',
            data: objNovosDados,
            success: data =>{
                if(data.status == 200){
                    alert('Chamado criado com sucesso');

                    location.reload();
                }else{
                    alert('Não foi possível criar o chamado');

                    location.reload();
                }
            }
        })
    })

    // Reload Lista
    $('#reloadedListaButton').click(e => {
        e.preventDefault();

        $('#cardListChamados').empty();
        $('#cardListChamados').append('<p>Carregando dados...</p>')

        $.get("/data/chamados", data=>{
       
            let dadosAPI = JSON.parse(data);
    
            $('#cardListChamados').empty();
    
            for(var i = 0; i < dadosAPI.length; i++){
                criaChamado(dadosAPI[i]);
            }
    
        });
    })

    // Abrir e Fechar Chat
    $('#chat .chatHeader').click(e=>{
        e.preventDefault();

        $('#chat').toggleClass('enabled');
    })

})

function criaChamado(dados){

    // Recebe cada conjunto de dados da API
    let dadosChamado = dados;

    dadosChamado.chamado_data = (dadosChamado.chamado_data.split("T")[0]).split("-");
    dadosChamado.chamado_data = `${dadosChamado.chamado_data[2]}/${dadosChamado.chamado_data[1]}/${dadosChamado.chamado_data[0]}`

    console.log(dadosChamado.chamado_data);

    // Valida Icone 
    switch(dadosChamado.chamado_tipo){
        case 'Caça aos Animais':
            dadosChamado.icone = "/img/skull-solid.svg";
            break;
        case 'Maus-tratos de Animal':
            dadosChamado.icone = "/img/pawprint.svg";
            break;
        case 'Incêndio':
            dadosChamado.icone = "/img/fire.svg";
            break;
        case 'Desmatamento':
            dadosChamado.icone = "/img/tree-solid.svg";
            break;
        case 'Poluição de Rios':
            dadosChamado.icone = "/img/tint-solid.svg";
            break;
    }

    // Cria html do elemento
    let elementoHTML = `
    <div class="card ${dadosChamado.chamado_status}">
        <div class="cardStatus">${dadosChamado.chamado_status}</div>
        <div id="cardCategory" class="animal"><img src="${dadosChamado.icone}" alt=""></div>
        <h3 class="cardTitle">${dadosChamado.chamado_tipo}</h3>
        <div class="cardInfos">
            <p class="cardLocation">${dadosChamado.chamado_local} - por ${dadosChamado.chamado_donoNome}</p>
            <p class="dateTime">${dadosChamado.chamado_data}</p>
        </div>
    `;

    if(idUsuarioLogado == dadosChamado.chamado_dono || idUsuarioLogado == 11){
        elementoHTML = elementoHTML + `
            <div class="cardAction">
                <a href="" onclick="editarChamado(event,${dadosChamado.id})" class="edit">Editar</a>
                <a href="" onclick="finalizarChamado(event,${dadosChamado.id})" class="finish">Finalizar</a>
                <a href="" onclick="removeChamado(event,${dadosChamado.id})" class="remove">Remover</a>
            </div>
        </div>
        `;
    }else{
        elementoHTML = elementoHTML + `
        </div>            
        `;
    }

    $('#cardListChamados').append(elementoHTML);

}

function editarChamado(e, id){
    e.preventDefault();

    $.post(`/data/busca?id=${id}`, data => {

        let dadosChamado = JSON.parse(data);
        
        dadosChamado.chamado_data = dadosChamado.chamado_data.split("T")[0]

        // Substitui informação do caso
        $('#modalEditarChamado #editarCaso').find(`option[value="${dadosChamado.chamado_tipo}"]`).attr("selected","selected");
        // Substitui informação do estado
        $('#modalEditarChamado #editarEstado').find(`option[value="${dadosChamado.chamado_status}"]`).attr("selected","selected");
        // Substitui informação do local
        $('#modalEditarChamado #editarLocal').val(dadosChamado.chamado_local);
        // Substitui informação da data e hora
        $('#modalEditarChamado #editarData').val(dadosChamado.chamado_data);
        // Substitui id do chamado
        $('#chamadoID').val(id);

        // Habilita modal
        $('#modalEditarChamado').addClass('enabled')

    })

}

function finalizarChamado(e, id){

    e.preventDefault();

    if(confirm('Tem certeza que deseja finalizar esse chamado?')){
        
        let url = `/data/finalizar?id=${id}`;

        $.post(url, data => {

            alert('Finalizado com sucesso');

            location.reload();

        })

    }

}

function removeChamado(e,id){

    e.preventDefault();

    if(confirm('Tem certeza que deseja excluir esse chamado?')){
        
        let url = `/data/deletar?id=${id}`;

        $.post(url, data => {

            alert('Excluído com sucesso');

            location.reload();

        })

    }

}

// Conecta com o WebSocket
var socket = io('http://25.112.43.40:5000');

function renderMessage(msg){
    $('.messages').append('<div class="msg"><b>'+ msg.author +'</b>: '+msg.message+'</div>');
}

socket.on('previousMessage', function(msgs){
    renderMessage(msgs);
})

socket.on('receivedMessage', function(msg){
    renderMessage(msg);
})

$('#chat').submit(function(event){
    event.preventDefault();

    var author = UsuarioLogado
    var message = $('#chatTextMessage').val();
    var authorID = idUsuarioLogado;
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);

    $('#chatTextMessage').val('');

    if(author.length && message.length) {
        var messageObject = {
            author: author,
            message: message,
            authorID: authorID,
            data: date
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    }
})
