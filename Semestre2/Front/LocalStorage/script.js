listarProdutos();

function adicionarProduto(){
    let nome = document.querySelector("#produto").value;
    let qntd = document.querySelector("#quantidade").value;

    let produto = {
        "nome":nome,
        "quantidade":qntd
    }

    let produtos = localStorage.getItem("produtos");

    if(produtos == null){
        produtos = [];
    } else{
        produtos = JSON.parse(produtos);
    }

    produtos.push(produto);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    listarProdutos();
}

function listarProdutos(){
    let produtos = localStorage.getItem("produtos");

    let tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    produtos = JSON.parse(produtos);

    produtos.forEach((p, i) => {
        let linha = document.createElement("tr");
        let tdProduto = document.createElement("td");
        let tdQuantidade = document.createElement("td");
        let tdExcluir = document.createElement("td");

        tdProduto.innerHTML = p.nome;
        tdQuantidade.innerHTML = p.quantidade;
        
        tdExcluir.appendChild(removerProduto(i));

        linha.appendChild(tdProduto);
        linha.appendChild(tdQuantidade);
        linha.appendChild(tdExcluir);
        tbody.appendChild(linha);
    });
}

function removerProduto(indice){
    let produtos = localStorage.getItem("produtos");

    produtos = JSON.parse(produtos);

    let btnExcluir = document.createElement("button");
    
    btnExcluir.innerHTML = "Excluir";

    btnExcluir.addEventListener("click", () => {
        produtos.splice(indice, 1);
        localStorage.setItem("produtos",  JSON.stringify(produtos));
        listarProdutos();
    });

    return btnExcluir;
};