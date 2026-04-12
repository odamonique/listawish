const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");

const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");

switch (tipo) {
    case "invalido":
        titulo.innerText = "Link inválido";
        descricao.innerText = "O link fornecido não é válido."
        break;
    case "404":
        titulo.innerText = "Lista não encontrada";
        descricao.innerText = "Esta lista não existe ou foi removida."
        break;
    case "expirado":
        titulo.innerText = "Lista expirada";
        descricao.innerText = "Esta lista não está mais disponível.";
        break;
    default:
        titulo.innerText = "Erro ao carregar";
        descricao.innerText = "Tente novamente mais tarde.";
        break;
}
