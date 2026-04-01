const db = require('../config/database');

//criarItem()
const criarItem = (nome, url, listaId) => {

    return new Promise((resolve, reject) => {
        
        const sql = `INSERT INTO itens (nome, url, listaId) 
        VALUES (?, ?, ?)`;

        db.run(sql, [nome, url, listaId], function (err) {
            if (err) {
                reject(err);
            }else{
                resolve({
                    id: this.lastID,
                    nome,
                    url,
                    status: 'disponivel',
                    listaId
                });
            }
        });
    })
};

//buscarItensLista()
const buscarItensLista = (listaId) =>{

    return new Promise((resolve, reject) => {
        //Busca pelo id da lista
        const sql = `SELECT * FROM itens WHERE listaId = ?`;

        db.all(sql, [listaId], (err, rows) => {
            if (err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    })
};

//atualizarStatusItem()
const atualizarStatusItem = (id, status) => {

    return new Promise((resolve, reject) => {
        
        const sql = `UPDATE itens SET status = ? WHERE id = ?`;

        db.run(sql, [status, id], function (err) {
            if (err) {
                reject(err);
            }else{
                resolve({updated: this.changes});
            }
        });
    })

};

//buscarItem()
const buscarItem = (id) => {

    return new Promise((resolve, reject) => {
        //Busca item pelo id do item
        const sql = `SELECT * FROM itens WHERE id = ?`;

        db.get(sql, [id], (err, row) => {
            if(err){
                reject(err);
            }else{
                resolve(row)
            }
        });
    });
};

//deletarItem()
const deletarItem = (id) => {
    return new Promise((resolve, reject) => {
        
        const sql = `DELETE FROM itens WHERE id = ?`;

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            }else{
                resolve({deleted: this.changes});
            }
        });
    });
}

module.exports = {
    criarItem, 
    buscarItensLista, 
    atualizarStatusItem, 
    buscarItem,
    deletarItem
};