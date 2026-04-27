//URL base da API
const API_URL = "http://localhost:3000";

//Função para obter o token de autenticação armazenado no navegador
function getToken() {
    return localStorage.getItem("token");
}
//Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

//Função para fazer requisições http a API
async function apiRequest(endpoint, method = "GET", body = null) {
    //cabeçalhos iniciais da requisição 
    const headers = {"Content-Type": "application/json"};

    //Pega o token de autenticação
    const token = getToken();

    //Se houver token, adicionar no cabeçalho Authorization
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    //Faz a requisição usando fetch
    const response = await fetch(API_URL + endpoint, {
        method, headers, body: body ? JSON.stringify(body) :null
    });

    //Converte a resposta da API em json
    const data = await response.json();

    //Logout automático
    if (response.status === 401) {
        localStorage.clear();
        toast("Sessão expirada. Faça login novamente");
        setTimeout(() => logout(), 4000);
        throw { status: 401 };
    }

    //Lança erro se a resposta não for ok
    if (!response.ok) {
        //throw new Error(data.error || "Erro na requisição");
        const error = new Error(data.error || "Erro na requisição");
        error.status = response.status;
        throw error;
    }

    //retorna os dados JSON da API
    return data;
}

