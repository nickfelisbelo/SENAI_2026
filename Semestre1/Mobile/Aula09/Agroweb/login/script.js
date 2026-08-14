const API = "http://localhost:3000";

function login(e){
    e.preventDefault();

    const dados = {
        email: formLogin.email.value,
        senha: formLogin.senha.value
    }
    enviarDadosAPI(dados);
}

function salvarCredenciaisLocais(dados){
    window.localStorage.setItem('credenciais', JSON.stringify(dados));
}

function enviarDadosAPI(dados){
    fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(response => response.json())
    .then(data => {
        if(data.accessToken){
            salvarCredenciaisLocais(dados);
            window.location.href = "../home"
        } else{
            msg.innerHTML = 'Email ou senha incorretos'
            console.log(error);
        }
    });
}