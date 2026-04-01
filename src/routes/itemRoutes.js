const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const verificarDonoDaLista = require('../middleware/VerificarDonoDaLista');
const verificarDonoDoItem = require('../middleware/verificarDonoDoItem');

//Rota de criar item
router.post('/', authMiddleware, verificarDonoDaLista ,itemController.criarItem);

//Rota de mostrar itens da lista
router.get('/:listaId', authMiddleware, verificarDonoDaLista ,itemController.mostrarItens);

//Rota de atualizar status
router.patch('/:id', authMiddleware, itemController.atualizarStatus);

//Rota de deletar item
router.delete('/:id', authMiddleware, verificarDonoDoItem, itemController.deletarItem);

module.exports = router;
