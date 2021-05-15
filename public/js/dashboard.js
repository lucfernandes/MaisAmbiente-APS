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

    })

})

function criaChamado(dados){

    // Recebe cada conjunto de dados da API
    let dadosChamado = dados;

    tempChamado_data = new Date(dadosChamado.chamado_data);

    dadosChamado.chamado_data = `${tempChamado_data.getDate()}/${tempChamado_data.getMonth()}/${tempChamado_data.getFullYear()}`;

    // Valida Icone 

    let elementoHTML = `
    <div class="card ${dadosChamado.chamado_status}">
        <div class="cardStatus">${dadosChamado.chamado_status}</div>
        <div id="cardCategory" class="animal"><img src="/img/pawprint.svg" alt=""></div>
        <h3 class="cardTitle">${dadosChamado.chamado_tipo}</h3>
        <div class="cardInfos">
            <p class="cardLocation">${dadosChamado.chamado_local} - por ${dadosChamado.chamado_dono}</p>
            <p class="dateTime">${dadosChamado.chamado_data}</p>
        </div>
        <div class="cardAction">
            <a href="" onclick="editarChamado(event,${dadosChamado.id})" class="edit">Editar</a>
            <a href="" onclick="finalizarChamado(event,${dadosChamado.id})" class="finish">Finalizar</a>
            <a href="" onclick="removeChamado(event,${dadosChamado.id})" class="remove">Remover</a>
        </div>
    </div>
    `;

    $('#cardListChamados').append(elementoHTML);

}

function editarChamado(e, id){
    e.preventDefault();

    $.post(`/data/busca?id=${id}`, data => {

        let dadosChamado = JSON.parse(data);

        console.log(dadosChamado);

        tempChamado_data = new Date(dadosChamado.chamado_data);

        dadosChamado.chamado_data = `${tempChamado_data.getDate()}/${tempChamado_data.getMonth()}/${tempChamado_data.getFullYear()}`;

        // Substitui informação do caso
        $('#modalEditarChamado #editarCaso').find(`option[value="${dadosChamado.chamado_tipo}"]`).attr("selected","selected");
        // Substitui informação do estado
        $('#modalEditarChamado #editarEstado').find(`option[value="${dadosChamado.chamado_status}"]`).attr("selected","selected");
        // Substitui informação do local
        $('#modalEditarChamado #editarLocal').val(dadosChamado.chamado_local);
        // Substitui informação da data e hora
        $('#modalEditarChamado #editarData').val(dadosChamado.chamado_data);

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
