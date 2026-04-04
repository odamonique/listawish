const express = require("express");
require('./config/database');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const listaRoutes = require('./routes/listaRoutes');
const itemRoutes = require('./routes/itemRoutes');
const publicRoutes = require('./routes/publicRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use('/usuarios', usuarioRoutes);
app.use('/listas', listaRoutes);
app.use('/itens', itemRoutes);
app.use('/public', publicRoutes);

app.get('/test', (req, res) =>{
    res.send("Server working!");
});

app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});

//Tratar erro
app.use((err, req, res, next) => {
    //Erro de parse do JSON
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).json({
            error: "JSON invalido"
        });
    }
    next();
});

