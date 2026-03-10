const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

//Função de registrar usuario
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

//Função de login de usuario
const loginUsuario = async (req,res) => {
    
    try {
        
        const {email, senha} = req.body
        if(!email || !senha){
            return res.status(400).json({
                error: "Email e senha são obrigatórios"
            });
        };

        const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

        if(!usuario){
            return res.status(401).json({
                error: "Email inválido"
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

        if(!senhaCorreta){
            return res.status(401).json({
                error: "Senha inválida"
            });
        }

        //Se o email e senha estiverem corretos, realizar o login
        return res.status(200).json({
            message: "Login realizado com sucesso",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email:usuario.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor."
        });
    };
};




module.exports = { registrarUsuario, loginUsuario };