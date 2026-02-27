const modalCliente = document.getElementById("modalCliente");
var clientes = JASON.parce(localStorage.getItem("clientes")) || [];
renderizarTabela();

function salvarLocal(){
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function abrirModal(){
    modalCliente.style.display="block";
}

function fecharModal(){
    modalCliente.style.display="none";
}

const cadastrarCliente = document.getElementById("cadastrarCliente");
cadastrarCliente.addEventListener("submit", formulario => {
    formulario.preventDefault();
    // Campos em variaveis locais(let)
    const dados = {
        cpf: cadastrarCliente.cpf.value,
        nome: cadastrarCliente.nome.value,
        sobrenome: cadastrarCliente.sobrenome.value,
        nascimento: cadastrarCliente.nascimento.value
    }
    //Adicionar os campos na lista clientes
    clientes.push(dados);
    renderizarTabela();
    fecharModal();
    cadastrarCliente.reset();
    salvarLocal();
})

function renderizarTabela(){
    const dados = document.getElementById("dados");
    dados.innerHTML = ""; //Limpa todas as linhas da tabela
    // Percorrer a lista preenchendo a tabela novamente
    clientes.forEach((c, i) => {
        dados.innerHTML += `
        <tr>
            <td>${c.cpf}</td>
            <td>${c.nome}</td>
            <td>${c.sobrenome}</td>
            <td>${c.nascimento}</td>
            <td><button onclick = "Excluir(${i})">Excluir</button></td>
        </tr>
        `;
    })
}

function Excluir(indice){
    clientes.splice(indice, 1);
    salvarLocal();
    window.location.reload();
}