const express = require("express");
require('./config/database');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const listaRoutes = require('./routes/listaRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/listas', listaRoutes);

app.get('/test', (req, res) =>{
    res.send("Server working!");
});

app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});

