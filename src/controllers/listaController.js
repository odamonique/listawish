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

        return res.status(201).json(
            //{message: "Lista criada com sucesso!",lista: novaLista}
            novaLista
        );
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

//deletarLista()
const deletarLista = async (req, res) => {

    try {
        const lista = req.lista;
    
        const resultado = await listaModel.deletarLista(lista.id);

        if (resultado.deleted === 0) {
            return res.status(404).json({
                error: "Lista não encontrada"
            });
        }
        return res.status(200).json({
            messsage: "Lista deletada com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }

};

//atualizarLista()
const atualizarLista = async (req, res) => {
    try {
    
        const {titulo, descricao, dataExpiracao} = req.body;

        //Usar middleware
        const lista = req.lista;

        //Validação se nenhum campo for enviado
        if (!titulo && !descricao && !dataExpiracao) {
            return res.status(400).json({
                error: "Nenhum campo foi enviado para ser atualizado"
            });
        }

        //Se um novo valor não for enviado, manter o antigo
        const novoTitulo = titulo || lista.titulo;
        const novaDescricao = descricao !== undefined ? descricao : lista.descricao;
        const novaDataExpiracao = dataExpiracao || lista.dataExpiracao;

        //Validar a data
        if (novaDataExpiracao) {
            const agora = new Date();
            const data = new Date(novaDataExpiracao);
            
            if (data <= agora) {
                return res.status(400).json({
                    error: "Data de expiração deve ser futura"
                });
            }
        }

        const resultado = await listaModel.atualizarLista(
            lista.id, 
            novoTitulo,
            novaDescricao,
            novaDataExpiracao
        );

        if (resultado.updated === 0) {
            return res.status(404).json({
                error: "Lista não encontrada"
            })
        }

        return res.status(200).json({
            message: "Lista atualizada com sucesso"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}

module.exports = {
    criarLista, 
    mostrarListas, 
    visualizarListaPublica,
    deletarLista,
    atualizarLista
}; 