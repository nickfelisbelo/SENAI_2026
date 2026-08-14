let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

document.addEventListener("DOMContentLoaded", renderizarTabela);

function abrirModal(){
    document.getElementById("modal").style.display = "block";
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
    limparCampos();
}

function salvarFilme(){
    const capa = document.getElementById("capa").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const ano = document.getElementById("ano").value.substring(0,4);
    const classificacao = document.getElementById("opcoes").value;
    const produtora = document.getElementById("produtora").value.trim();
    if(!capa || !nome || !genero || !ano || !classificacao || !produtora){
        alert("Todos os campos são obrigatórios!");
        return;
    }
    const novoFilme = {
        id: Date.now(),
        capa,
        nome,
        genero,
        ano,
        classificacao,
        produtora
    };
    filmes.push(novoFilme);
    atualizarLocalStorage();
    renderizarTabela();
    fecharModal();
}

function renderizarTabela(){
    const tabela = document.getElementById("dados");
    tabela.innerHTML = "";
    filmes.forEach(filme =>{
        tabela.innerHTML += `
        <tr>
            <td>
            <img src="${filme.capa}" width="80">
            </td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.produtora}</td>
            <td>
            <button onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>
        </tr>
        `;
    });
}

function excluirFilme(id){
    filmes = filmes.filter(filme => filme.id !== id);
    atualizarLocalStorage();
    renderizarTabela();
}

function atualizarLocalStorage(){
    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function limparCampos(){
    document.getElementById("capa").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("opcoes").value = "";
    document.getElementById("produtora").value = "";
}

function buscarGenero(){
    const generoBusca = document.getElementById("buscarGenero").value.toLowerCase();
    const tabela = document.getElementById("dados");
    tabela.innerHTML = "";
    filmes.forEach(filme =>{
        if(filme.genero.toLowerCase().includes(generoBusca)){
            tabela.innerHTML += `
            <tr>
                <td><img src="${filme.capa}" width="50"></td>
                <td>${filme.nome}</td>
                <td>${filme.genero}</td>
                <td>${filme.ano}</td>
                <td>${filme.classificacao}</td>
                <td>${filme.produtora}</td>
                <td>
                    <button onclick="excluirFilme(${filme.id})">Excluir</button>
                </td>
            </tr>
            `;
        }
    });
}