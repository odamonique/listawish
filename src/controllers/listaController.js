const listaModel = require('../models/listaModel');
const crypto = require('crypto');

//criarLista()
const criarLista = async (req, res) => {

    try {
        
        const {titulo, descricao, dataExpiracao} = req.body;

        if (!titulo || !dataExpiracao) {
            return res.status(400).json({
                error: "Título e data de expiração são obrigatórios"
            });
        };

        const usuarioId = req.usuarioId;

        //Gerar token único para link público
        const linkToken = crypto.randomBytes(16).toString('hex');

        const novaLista = await listaModel.criarLista(
            titulo,
            descricao,
            dataExpiracao,
            linkToken,
            usuarioId
        );

        return res.status(201).json({
            message: "Lista criada com sucesso!",
            lista: novaLista
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
};

//mostrarListas()
const mostrarListas = async (req, res) => {
    
    try {

        const usuarioId = req.usuarioId;

        const listas = await listaModel.buscarListasPorUsuario(usuarioId);

        return res.status(200).json(listas);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}

module.exports = {criarLista, mostrarListas};