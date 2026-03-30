const listaModel = require('../models/listaModel');

//Verificar dono da lista
const verificarDonoDaLista = async (req, res, next) => {
    try {
        const listaId = req.params.listaId || req.body.listaId;

        if (!listaId) {
            return res.status(400).json({
                error: "ListaId não informado"
            });
        }
        //Buscar lista
        const lista = await listaModel.buscarListaPorId(listaId);

        if (!lista) {
            return res.status(404).json({
                error: "Lista não encontrada"
            });
        }
        
        //verificar dono da lista
        if (lista.usuarioId !== req.usuarioId) {
            return res.status(403).json({
                error: "Acesso negado: Esta lista não pertence ao usuario"
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
};

module.exports = verificarDonoDaLista;

