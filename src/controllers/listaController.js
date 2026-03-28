const listaModel = require('../models/listaModel');
const itemModel = require('../models/itemModel');
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
};

//visualizarListaPublica()
const visualizarListaPublica = async (req, res) =>{

    try {
        const {token} = req.params;

        if (!token || token.length < 10) {
            return res.status(400).json({
                error:  "Token inválido"
            });
        }
        //Buscar lista
        const lista = await listaModel.buscarListaPorToken(token);

        if (!lista) {
            return res.status(404).json({
                error: "Lista não encontrada"
            });
        }

        //Verificar se a lista é valida pela data de expiração
        const agora = new Date();
        const dataExpiracao = new Date(lista.dataExpiracao);

        if (agora > dataExpiracao) {
            return res.status(410).json({
                error: "Esta lista expirou"
            });
        }
        //Buscar itens
        const itens = await itemModel.buscarItensLista(lista.id)

        //Retornar a lista e seus itens
        return res.status(200).json({
            lista,
            itens
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
};

module.exports = {criarLista, mostrarListas, visualizarListaPublica};