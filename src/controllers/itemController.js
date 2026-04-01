const itemModel = require('../models/itemModel');
const listaModel = require('../models/listaModel');

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

        const {token, id} = req.params;

        //Buscar lista pelo token
        const lista = await listaModel.buscarListaPorToken(token);

        if (!lista) {
            return res.status(404).json({
                error: "Lista não encontrada"
            });
        }

        //buscar item
        const item = await itemModel.buscarItem(id);

        if (!item) {
            return res.status(404).json({
                error: "Item não encontrado"
            });
        }

        //Verificar e o item pertence a lista do token
        if (item.listaId !== lista.id) {
            return res.status(403).json({
                error: "Este item não pertence a esta lista"
            });
        }

        if (item.status === "comprado") {
            return res.status(400).json({
                error: "Item já foi comprado"
            });
        }

        //Atualizar status do item
        await itemModel.atualizarStatusItem(id, "comprado");

        return res.status(200).json({
            message: "Item marcado como comprado"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
};

//deletarItem()
const deletarItem = async (req,res) => {
    try {
        const item = req.item;

        //Não deletar item marcado como comprado
        if (item.status === "comprado") {
            return res.status(400).json({
                error: "Não é possivel deletar um item já comprado"
            });
        }

        const resultado = await itemModel.deletarItem(item.id);

        if (resultado.deleted === 0) {
            return res.status(404).json({
                error: "Item não encontrado"
            });
        }

        return res.status(200).json({
            message: "Item deletado com sucesso"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        })
    }
}

module.exports = {
    criarItem,
    mostrarItens, 
    atualizarStatus,
    deletarItem
};