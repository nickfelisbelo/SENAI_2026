const credenciais = JSON.parse(window.localStorage.getItem("credenciais"));
if(!credenciais){
    window.location.href = "../"
}

msg.innerHTML = `Bem-vindo, ${credenciais.user.nome}!`;
console.log(credenciais);

function sair(){
    window.localStorage.removeItem('credenciais');
    window.location.href = '../';
}
