//Pegar id da lista da URL
const params = new URLSearchParams(window.location.search);
const listaId = params.get("id");

//Validar o id da lista 
if (!listaId) {
    toast("Lista não encontrada");
    window.location.href = "minhas-listas.html";
}

//Voltar
function voltar() {
    window.location.href = "minhas-listas.html";
};

//Carregar titulo da lista e itens
document.addEventListener("DOMContentLoaded", 
    () => {carregarTituloLista(); carregarItens()});

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
        toast("Item adicionado!");
        e.target.reset();
        
    } catch (error) {
        toast(error.message);
    }

});
//Pegar titulo da lista atual
async function carregarTituloLista() {
    try {
        const listas = await apiRequest("/listas");

        const lista = listas.find(l => l.id == listaId);

        if (!lista) {
            toast("Lista não encontrada");
            return;
        }

        document.getElementById("tituloLista").innerText =
            `Itens da Lista: ${lista.titulo}`;

    } catch (error) {
        toast(error.message);
    }
}

//Buscar itens 
async function carregarItens() {
    try {
        //Buscar id da lista
        const itens = await apiRequest(`/itens/${listaId}`);

        const ul = document.getElementById("itens");
        ul.innerHTML = "";

        ////Cria um li para cada lista recebida
        itens.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("item-card");

            div.innerHTML = 
            `<div class="item-header">
                <div>
                    <h3>${item.nome}</h3>
                    <span class="item-status ${item.status === "comprado" ? "comprado" : "disponivel"}">
                    ${item.status === "comprado" ? "Comprado" : "Disponível"}</span>
                </div>
            </div>

            ${item.url ? `<a href="${item.url}" target="_blank" class="item-link">🔗 Ver produto</a>` : ""}

            <div class="item-actions">
                <button class="btn-danger" onclick="deletarItem(${item.id})">🗑️ Deletar</button>
            </div>`;

            ul.appendChild(div);

        });

    } catch (error) {
        toast(error.message);
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

