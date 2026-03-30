const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const verificarDonoDaLista = require('../middleware/VerificarDonoDaLista');

//Rota de criar item
router.post('/', authMiddleware, verificarDonoDaLista ,itemController.criarItem);

//Rota de mostrar itens da lista
router.get('/:listaId', authMiddleware, verificarDonoDaLista ,itemController.mostrarItens);

//Rota de atualizar status
router.patch('/:id', authMiddleware, itemController.atualizarStatus);

module.exports = router;
