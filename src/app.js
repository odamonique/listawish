const express = require("express");
require('./config/database');

const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.get('/test', (req, res) =>{
    res.send("Server working!");
});

app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});

