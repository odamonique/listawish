const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');

//Criar rota de registro 
router.post('/registro', usuarioController.registrarUsuario);

module.exports = router;