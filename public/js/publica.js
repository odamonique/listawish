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

            const div = document.createElement("div");
            div.classList.add("public-item-card");

            if(item.status === "comprado") {
                div.classList.add("comprado");
            }

            div.innerHTML = 
            `<div class="public-item-top">
                <div>
                    <h3>${item.nome}</h3>
                    <span class="public-status ${item.status === "comprado" ? "comprado" : "disponivel"}">
                        ${item.status === "comprado" ? "Comprado" : "Disponível"}
                    </span>
                </div>
            </div>

            ${item.url ? `<a href="${item.url}" target="_blank" class="public-link">🔗 Ver produto</a>` : ""}

            <div class="public-actions">

                ${item.status !== "comprado" ? `
                    <button onclick="comprarItem(${item.id})">Confirmar Presente</button>` : `
                    <button disabled>✔️ Presente reservado</button>`
                }

            </div>`;

            ul.appendChild(div);
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
//Confirmar compra do item 
function confirmarAcao(mensagem) {
    return new Promise((resolve) => {
        const ok = confirm(mensagem);
        resolve(ok);
    });
}
//Marcar como comprado 
async function comprarItem(id) {

    const confirmou = await confirmarAcao("Tem certeza que deseja marcar como comprado?");
    if (!confirmou) {
        return;
    }

    try {
        await apiRequest(`/public/lista/${token}/item/${id}`, "PATCH", {status: "comprado"});

        carregarLista();

    } catch (error) {
        toast(error.message);
    }
}