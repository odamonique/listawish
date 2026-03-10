const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');

//Rota de registro 
router.post('/registro', usuarioController.registrarUsuario);

//Rota de login
router.post('/login', usuarioController.loginUsuario)

module.exports = router;