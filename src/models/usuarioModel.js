const db = require('../config/database');

//criarUsuario()
const criarUsuario = (nome, email, senhaHash) => {

    return new Promise((resolve, reject)=>{

        const sql = `INSERT INTO usuarios (nome, email, senhaHash) 
        VALUES (?, ?, ?)`;

        db.run(sql, [nome, email, senhaHash], function (err) {
            if (err) {
                reject(err);
            }else{
                resolve({
                    id: this.lastID,
                    nome,
                    email
                });
            };
        });
    });

};

//buscarUsuarioPorEmail
const buscarUsuarioPorEmail = (email) => {

    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM usuarios WHERE email = ?`;

        db.get(sql, [email], (err, row) => {
            if(err){
                reject(err);
            }else{
                resolve(row);
            }
        });

    });

};

module.exports = {criarUsuario, buscarUsuarioPorEmail};