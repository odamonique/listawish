const listaController = require('../src/controllers/listaController');
const listaModel = require('../src/models/listaModel');
const itemModel = require('../src/models/itemModel');

//Mock dos models (acesso por versão simulada)
jest.mock('../src/models/listaModel');
jest.mock('../src/models/itemModel');

test("Não deve permitir acesso a lista expirada", async () => {

    //Simular requisição HTTP com acesso da lista por token
    const req = {
        params: {
            token: "1234567890"
        }
    };
    //Simular resposta HTTP do express
    const res = {
        //Mock função status do obj res
        status: jest.fn().mockReturnThis(),
        //Mock retorno json da API
        json: jest.fn()
    };

    // Mock de lista existente e expirada
    listaModel.buscarListaPorToken.mockResolvedValue({
        id: 1,
        dataExpiracao: "2000-01-01"
    });
    //Executar método
    await listaController.visualizarListaPublica(req, res);

    expect(res.status).toHaveBeenCalledWith(410);
    expect(res.json).toHaveBeenCalledWith({
        error: "Esta lista expirou"
    });

});
