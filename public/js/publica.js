const params = new URLSearchParams(window.location.search);
const token = params.get("token");


//Carregar lista
document.addEventListener("DOMContentLoaded", carregarLista);

async function carregarLista() {

    //Validar Token 
    if (!token) {
        window.location.href = "/erro.html?tipo=invalido";
        return;
    };

    console.log(token);

    try {
        const data = await apiRequest(`/public/lista/${token}`);

        const lista = data.lista;
        const itens = data.itens;

        document.getElementById("titulo").innerText = lista.titulo;
        document.getElementById("descricao").innerText = lista.descricao || "";
        document.getElementById("dataExpiracao").innerText = 
        `Expira em: ${ new Date(lista.dataExpiracao).toLocaleDateString('pt-BR')}`;

        const ul = document.getElementById("itens");
        ul.innerHTML = "";

        itens.forEach(item => {

            const li = document.createElement("li");

            li.innerHTML = `<strong>${item.nome}</strong> 
            ${item.url ? `<a href="${item.url}" target="_blank">Link</a>` : ""}<br>
            status: ${item.status}<br>
            ${item.status !== "comprado" ? `<button onclick="comprarItem(${item.id})">
            Marcar como comprado</button>` : "comprado"}<hr>`;

            //Visual 
            if (item.status === "comprado") {
                li.style.textDecoration = "line-through";
            }

            ul.appendChild(li);
        });


    } catch (error) {
        if (error.status === 400) {
            window.location.href = "/erro.html?tipo=invalido";
        }else if (error.status === 404) {
            window.location.href = "/erro.html?tipo=404";
        }else if (error.status === 410) {
            window.location.href = "/erro.html?tipo=expirado";
        }else{
            window.location.href = "/erro.html?tipo=erro";
        }
    }
};

//Marcar como comprado 
async function comprarItem(id) {
    try {
        await apiRequest(`/public/lista/${token}/item/${id}`, "PATCH", {status: "comprado"});

        carregarLista();

    } catch (error) {
        toast(error.message);
    }
}