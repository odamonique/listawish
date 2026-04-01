const itemModel = require('../models/itemModel');
const listaModel = require('../models/listaModel');

const verificarDonoDoItem = async (req, res, next) => {
    try {
        const itemId = Number(req.params.id);

        if (!itemId || isNaN(itemId)) {
            return res.status(400).json({
                error: "ItemId inválido"
            });
        }

        //Buscar item
        const item = await itemModel.buscarItem(itemId);

        if (!item) {
            return res.status(404).json({
                error: "Item não encontrado"
            })
        }

        //Buscar lista do item
        const lista = await listaModel.buscarListaPorId(item.listaId);

        if (!lista) {
            return res.status(404).json({
                error: "Lista não encontrada"
            })
        }

        //Verificar dono da lista
        if (lista.usuarioId !== req.usuarioId) {
            return res.status(403).json({
                erro: "Acesso negado: Este item não pretence ao usuario"
            })
        }

        //Reutilizar depois 
        req.item = item;
        req.lista = lista;

        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}

module.exports = verificarDonoDoItem;