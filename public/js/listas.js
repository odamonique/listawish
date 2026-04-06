//Verificar se esta logado
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

//Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

//Carregar listas ao abrir a pagina
document.addEventListener("DOMContentLoaded", carregarListas);

//Criar lista
document.getElementById("formLista").addEventListener("submit", async (e) => {
    //Evita que a pagina recarregue
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const dataExpiracao = document.getElementById("dataExpiracao").value;

    try {
        //Chama função de requisição 
        await apiRequest('/listas', "POST", {
            titulo, descricao, dataExpiracao
        });

        //Atualiza as listas 
        carregarListas();
        //limpar campos do formulario 
        e.target.reset();

    } catch (error) {
        document.getElementById("erro").innerText = error.message;
    }
    
});

//Buca listas 
async function carregarListas() {
    try {
        const listas = await apiRequest("/listas");

        const ul = document.getElementById("listas");
        ul.innerHTML = "";

        //Cria um li para cada lista recebida
        listas.forEach(lista => {
            const li = document.createElement("li");

            li.innerHTML =`
            <strong>${lista.titulo}</strong> - ${lista.descricao || ""}<br>
            Expira: ${new Date(lista.dataExpiracao).toLocaleDateString('pt-BR')}<br> 
            <button onclick = "verLista('${lista.id}')">Abrir</button>
            <button onclick = "deletarLista(${lista.id})">Deletar</button>
            <hr>`;

            ul.appendChild(li);
        });
        
    } catch (error) {
        document.getElementById("erro").innerText = error.message;
    }
};

//Deleta lista
async function deletarLista(id) {
    //Cancela a função caso o usuario não confirmar
    if (!confirm("Deseja realmente deletar esta lista?")) {
        return;
    }

    try {

        await apiRequest(`/listas/${id}`, "DELETE");
        carregarListas();

    } catch (error) {
        alert(error.message);
    }
};

//Abrir lista
function verLista(id) {
    window.location.href = `lista.html?id=${id}`;
};

