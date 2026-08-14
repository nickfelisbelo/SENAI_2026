const url = "https://receitasapi-b-2025.vercel.app";
const receitas = [];

carregarReceitas();

function carregarReceitas(){
    fetch(url + '/receitas')
    .then(response => response.json())
    .then(data => {
        receitas.length = 0;
        receitas.push(...data);
        listarCards();
    })
    .catch(e => alert('Problemas com a conexão da API'));
}

function listarCards(){
    const container = document.getElementById("container");
    container.innerHTML = '';

    receitas.forEach(receita => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML= `
        <h3>${receita.nome}</h3>
        <img src = "${receita.img}">
        <p>Custo Aproximado ${receita.custoAproximado.toStringAsFixed(2)}</p>
        `;
        container.appendChild(card);
    });
}

function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}