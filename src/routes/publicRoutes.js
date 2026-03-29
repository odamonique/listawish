const express = require('express');
const router = express.Router();

const listaController = require('../controllers/listaController');
const itemController = require('../controllers/itemController');

//Rota publica para visualizar lista
router.get('/lista/:token', listaController.visualizarListaPublica);

//Marcar item como comprado 
router.patch('/lista/:token/item/:id', itemController.atualizarStatus);


module.exports = router;