const key = "815cf87ef85edffad559096bf1c48915";

function colocarDadosNaTela(dados) {
    const img = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
    const container = document.getElementById("container");

    const card = document.createElement('div');
    card.className = 'caixa-maior';
    card.innerHTML = `
    <div class="caixa-media">
        <h2 class="cidade">Tempo em ${dados.name}</h2>
        <p class="temp">${Math.floor(dados.main.temp)}º C</p>
        <div class="caixa-menor">
            <img src= ${img}
            class="img-previsao">
            <p class="texto-previsao">${dados.weather[0].description}</p>
        </div>
        <p class="umidade">Umidade: ${dados.main.humidity}%</p>
    </div>
    `;

    container.appendChild(card);
};

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
    colocarDadosNaTela(dados);
};

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}