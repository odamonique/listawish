const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

//Rota de criar item
router.post('/', authMiddleware, itemController.criarItem);

//Rota de mostrar itens da lista
router.get('/:listaId', authMiddleware, itemController.mostrarItens);

//Rota de atualizar status
router.patch('/:id', authMiddleware, itemController.atualizarStatus);

module.exports = router;
