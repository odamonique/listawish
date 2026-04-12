const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//Path of database  
const dbPath = path.resolve(__dirname, '../../database.sqlite');

//Create connection
const db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.log('Error to connect to database:', err.message);
    }else{
        if (process.env.NODE_ENV !== "test") {
            console.log('Database is connected!');
        }
        
        //Activate foreign keys
        db.run("PRAGMA foreign_keys = ON");
    }
});

//Create tables
db.serialize(()=>{

    //Users table
    db.run(`CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senhaHash TEXT NOT NULL)`, (err) => {
        if (err) console.error("Erro tabela usuarios:", err.message);
    });

    //Lists table
    db.run(`CREATE TABLE IF NOT EXISTS listas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        dataExpiracao TEXT NOT NULL,
        linkToken TEXT UNIQUE NOT NULL, 
        usuarioId INTEGER NOT NULL,
        FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
        )`, (err) => {
        if (err) console.error("Erro tabela listas:", err.message);
    });

    //Items table 
    db.run(`CREATE TABLE IF NOT EXISTS itens(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL,
        url TEXT,
        status TEXT NOT NULL DEFAULT 'disponivel',
        listaId INTEGER NOT NULL,
        FOREIGN KEY (listaId) REFERENCES listas(id) ON DELETE CASCADE
        )`,(err) => {
        if (err) console.error("Erro tabela itens:", err.message);
    });

});

module.exports = db;