//Pegar id da lista da URL
const params = new URLSearchParams(window.location.search);
const listaId = params.get("id");

//Validar o id da lista 
if (!listaId) {
    alert("Lista não encontrada");
    window.location.href = "minhas-listas.html";
}

//Voltar
function voltar() {
    window.location.href = "minhas-listas.html";
};

//Carregar itens
document.addEventListener("DOMContentLoaded", carregarItens);

//Criar Item
document.getElementById("formItem").addEventListener("submit", async (e) => {
    //Evitar que a pagina recarregue
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const url = document.getElementById("url").value;

    try {

        await apiRequest("/itens", "POST", {
            nome, url, listaId
        });

        //Atualizar itens
        carregarItens();
        e.target.reset();
        
    } catch (error) {
        document.getElementById("erro").innerText = error.message;
    }

});

//Buscar itens 
async function carregarItens() {
    try {
        //Buscar id da lista
        const itens = await apiRequest(`/itens/${listaId}`);

        const ul = document.getElementById("itens");
        ul.innerHTML = "";

        ////Cria um li para cada lista recebida
        itens.forEach(item => {
            const li = document.createElement("li");

            li.innerHTML = `<strong>${item.nome}</strong>
            ${item.url ? `<a href = "${item.url}" target = "_blank">Link</a>` : ""} <br>
            Status: ${item.status}<br>
            <button onclick = "deletarItem(${item.id})">Deletar</button> <hr>`;

            ul.appendChild(li);

        });

    } catch (error) {
        document.getElementById("erro").innerText = error.message;
    };
}

//Deletar item 
async function deletarItem(id) {
    if (!confirm("Deseja deletar este item?")) {
        return;
    }

    try {

        await apiRequest(`/itens/${id}`, "DELETE");
        carregarItens();

    } catch (error) {
        alert(error.message);
    }
};

