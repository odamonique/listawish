//Carrega componentes HTML reutilizáveis
async function loadComponent(id, file) {
    //Buscar arquivo HTML
    const response = await fetch(file);
    //Converte a resposta em texto
    const data = await response.text();
    //Insere o HTML dentro do elemento com o ID informado
    document.getElementById(id).innerHTML = data;
}

//Carrega automaticamente navbar e footer
loadComponent("navbar", "/components/navbar.html");
loadComponent("footer", "/components/footer.html");