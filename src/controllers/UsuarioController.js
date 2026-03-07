const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

//Criar função de registro 
const registrarUsuario = async (req, res) => {

    try {
 
        const {nome, email, senha} = req.body;

        if(!nome || !email || !senha ){
            return res.status(400).json({
                error: "Nome, email e senha são obrigatórios"
            });
        }

        const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({
                error: "Este email já existe!"
            });
        }

        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const novoUsuario = await usuarioModel.criarUsuario(
            nome,
            email,
            senhaHash
        );

        return res.status(201).json({
            message: "Usuario criado com sucesso!",
            usuario: novoUsuario
        });

    
    } catch (error) {
        
        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    };
    
};


module.exports = { registrarUsuario };