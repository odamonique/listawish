const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middleware/authMiddleware');

//Rota de registro 
router.post('/registro', usuarioController.registrarUsuario);

//Rota de login
router.post('/login', usuarioController.loginUsuario);

//Rota do perfil
router.get('/perfil', authMiddleware, (req, res) => {
    return res.json({
        message: "Acesso Autorizado",
        usuarioId: req.usuarioId
    });
});

module.exports = router;