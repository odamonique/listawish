const db = require("../config/database");


//criarLista()
const criarLista = (titulo, descricao, dataExpiracao, linkToken, usuarioId) => {

    return new Promise((resolve, reject) => {
        
        const sql = `INSERT INTO listas 
        (titulo, descricao, dataExpiracao, linkToken, usuarioId)
        VALUES (?, ?, ?, ?, ?)`;

        db.run(sql, [titulo, descricao, dataExpiracao, linkToken, usuarioId], function (err){
            if (err) {
                reject(err);
            }else{
                resolve({
                    id: this.lastID,
                    titulo,
                    descricao,
                    dataExpiracao,
                    linkToken,
                    usuarioId
                })
            }
        });
    })
};

//buscarListasPorUsuario()
const buscarListasPorUsuario = (usuarioId) => {

    return new Promise((resolve, reject) => {
        
        const sql = `SELECT * FROM listas WHERE usuarioId = ?`;

        db.all(sql, [usuarioId], (err, rows) => {
            if (err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    })
};

//buscarListaPorToken()
const buscarListaPorToken = (linkToken) => {

    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM listas WHERE linkToken = ?`;

        db.get(sql, [linkToken], (err, row) => {
            if (err) {
                reject(err);
            }else{
                resolve(row);
            }
        });
    });
};

//buscarListaPorId
const buscarListaPorId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM listas WHERE id =?`;

        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            }else{
                resolve(row);
            }
        });
    });
};

//deletarLista()
const deletarLista = (id) => {

    return new Promise((resolve, reject) => {
        
        const sql = `DELETE FROM listas WHERE id = ?`;

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            }else{
                resolve({deleted: this.changes});
            }
        });
    });
};

//atualizarLista()
const atualizarLista = (id, titulo, descricao, dataExpiracao) => {
    return new Promise((resolve, reject) => {
        
        const sql = `UPDATE listas SET titulo = ?, 
        descricao = ?, dataExpiracao = ? WHERE id = ?`;

        db.run(sql, [titulo, descricao, dataExpiracao, id], function (err) {
            if (err) {
                reject(err);
            }else{
                resolve({updated: this.changes});
            }
        });
    });
};

module.exports ={
    criarLista, 
    buscarListasPorUsuario, 
    buscarListaPorToken, 
    buscarListaPorId,
    deletarLista,
    atualizarLista
};
