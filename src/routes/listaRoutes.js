const express = require('express');
const router = express.Router();

const listaController = require('../controllers/listaController');
const authMiddleware = require('../middleware/authMiddleware');

//Rota de criar lista
router.post('/', authMiddleware, listaController.criarLista);

//Rota de mostrar lista
router.get('/', authMiddleware, listaController.mostrarListas);

module.exports = router;