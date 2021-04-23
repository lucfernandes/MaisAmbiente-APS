const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "maisambiente"
})

function verificaUsuario(){
    
    var sql

    con.connect(err => {
        if (err) throw err;
        sql = "SELECT * FROM users";
        con.query(sql, (err, res, fields)=>{
            if (err) throw err;
            console.log(res);
            return res;
        })
    })

}

module.exports = verificaUsuario;
