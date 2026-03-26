const itemModel = require('../models/itemModel');

//criarItem
const criarItem = async (req, res) => {
    
    try {

        const {nome, url, listaId} = req.body;

        if (!nome || !listaId) {
            return res.status(400).json({
                error: "Nome e listaId são obrigatórios"
            });
        };

        const novoItem = await itemModel.criarItem(nome, url, listaId);

        return res.status(201).json({
            message: "Item criado com sucesso",
            item:novoItem
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    };
};

//mostrarItens
const mostrarItens = async (req, res) => {

    try {
        
        const {listaId} = req.params;

        const itens = await itemModel.buscarItensLista(listaId);

        return res.status(200).json(itens);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
    
};

//Atualizar status para comprado
const atualizarStatus = async (req, res) => {
    
    try {

        const {id} = req.params;
        const {status} = req.body;

        if(!status){
            return res.status(400).json({
                error: "Status é obrigatorio"
            });
        }

        await itemModel.atualizarStatusItem(id, status);

        return res.status(200).json({
            message: "Status atualizado com sucesso!"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
};

module.exports = {criarItem, mostrarItens, atualizarStatus};