const express = require('express');
const router = express.Router();

const listaController = require('../controllers/listaController');
const authMiddleware = require('../middleware/authMiddleware');
const verificarDonoDaLista = require('../middleware/VerificarDonoDaLista');

//Rota de criar lista
router.post('/', authMiddleware, listaController.criarLista);

//Rota de mostrar lista
router.get('/', authMiddleware, listaController.mostrarListas);

//Rota de deletar lista
router.delete('/:id', authMiddleware, verificarDonoDaLista, listaController.deletarLista);

module.exports = router;