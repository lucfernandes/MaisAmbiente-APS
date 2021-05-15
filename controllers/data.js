const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE
});

exports.chamados = (req, res) => {
    
    let queryEstado = req.query.estado;
    let queryCasos = req.query.caso;

    let sql = "SELECT * FROM chamados WHERE chamado_status <> 'Inativo'";

    if(Object.keys(req.query).length === 0){
        // Acesso a dashboard padrão. Onde mostra todos os resultados

        let arrResults = [];

        db.query(sql, async (err, result) => {
            if(err){
                console.log(err);
            }else{
                for(var i = 0; i < result.length; i++){
                    arrResults.push(result[i]);
                }

                res.send(JSON.stringify(arrResults));
            }            
        })
    }else{
        // Acesso a dashboard filtrada. estado=Pendente&caso=Caça aos Animais
        
        
        if(queryCasos !== "" && queryCasos !== undefined){
            let sqlCasos = `
                AND chamado_tipo = '${queryCasos}'
            `;
            sql = sql + sqlCasos;
        };
        if(queryEstado !== "" && queryEstado !== undefined){
            let sqlEstado = `
                AND chamado_status = '${queryEstado}'
            `;
            sql = sql + sqlEstado;
        }

        let arrResults = [];

        db.query(sql, async (err, result) => {
            if(err){
                console.log(err);
            }else{
                for(var i = 0; i < result.length; i++){
                    arrResults.push(result[i]);
                }

                res.send(JSON.stringify(arrResults));
            }            
        })

    }

}

exports.deletarChamado = (req, res) => {
    
    let queryID = req.query.id;

    let sql = `UPDATE chamados SET chamado_status = 'Inativo' WHERE id = ${queryID}`;

    db.query(sql, async (err, result) => {
        if(err){
            console.log(err);
        }else{
            
            let json = {
                "status": 200,
                "Mensagem": "Excluído com sucesso"
            }

            res.send(JSON.stringify(json));

        }            
    })

}

exports.finalizarChamado = (req, res) => {
    
    let queryID = req.query.id;

    let sql = `UPDATE chamados SET chamado_status = 'Finalizado' WHERE id = ${queryID}`;

    db.query(sql, async (err, result) => {
        if(err){
            console.log(err);
        }else{
            
            let json = {
                "status": 200,
                "Mensagem": "Finalizado com sucesso"
            }

            res.send(JSON.stringify(json));

        }            
    })

}

exports.busca = (req, res) => {

    let queryID = req.query.id;

    let sql = `SELECT * FROM chamados WHERE id = ${queryID}`;

    db.query(sql, async (err, result) => {
        if(err){
            console.log(err);
        }else{
            
            res.send(JSON.stringify(result[0]));

        }            
    })

}
