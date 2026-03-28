const express = require('express');
const router = express.Router();

const listaController = require('../controllers/listaController');

//Rota publica
router.get('/lista/:token', listaController.visualizarListaPublica);

module.exports = router;