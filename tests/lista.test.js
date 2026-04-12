//Mock do model da lista (acesso por versão simulada)
jest.mock('../src/models/listaModel');

const listaController = require('../src/controllers/listaController');
const listaModel = require('../src/models/listaModel');

//Agrupar testes do listaController
describe('Lista Controller', () => {

    test('Não deve criar lista sem título', async () => {

        //Simular requisição HTTP enviada pelo usuario
        const req = {
            body: {
                descricao: "teste",
                dataExpiracao: "2099-12-31"
                //Omitir titulo para gerar erro
            },
            usuarioId: 1
        };
        //Simular resposta HTTP do express
        const res = {
            //Mock função status do obj res
            status: jest.fn().mockReturnThis(),
            //Mock retorno json da API
            json: jest.fn()
        };

        //Executar método
        await listaController.criarLista(req, res);

        //Se dados forem inválidos, não chamar o model
        expect(listaModel.criarLista).not.toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Título e data de expiração são obrigatórios"
        });
    });

});
