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

    //Pegar id
    const id = e.target.dataset.id;

    try {
        if (id) {
            //editar
            await apiRequest(`/listas/${id}`, "PUT", {
                titulo, descricao, dataExpiracao
            });

            //Limpar modo de edição 
            delete e.target.dataset.id;
        }else{
            //Criar 
            await apiRequest('/listas', "POST", {
            titulo, descricao, dataExpiracao
            });
        }

        //Atualiza as listas 
        carregarListas();
        //limpar campos do formulario 
        e.target.reset();

        //Voltar o botão para modo de criar 
        document.getElementById("btnSubmit").innerText = "Criar";

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
            <button onclick = "editarLista(${lista.id}, '${lista.titulo}', 
            '${lista.descricao || ''}', '${lista.dataExpiracao}')">Editar</button>
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

//Editar lista
function editarLista(id, titulo, descricao, dataExpiracao) {

    document.getElementById("titulo").value = titulo;
    document.getElementById("descricao").value = descricao;

    //Mudar formato da data
    const data = new Date(dataExpiracao).toISOString().split("T")[0];
    document.getElementById("dataExpiracao").value = data;

    //Salvar id editado 
    document.getElementById("formLista").dataset.id = id;

    //Mudar botão para modo salvar
    document.getElementById("btnSubmit").innerText = "Salvar";
}
