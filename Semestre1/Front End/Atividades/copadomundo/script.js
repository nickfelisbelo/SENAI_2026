import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVJQq8t5oRAT-03wt5KVJa3bIfIOAYc6k",
  authDomain: "figurinhas-5534c.firebaseapp.com",
  projectId: "figurinhas-5534c",
  storageBucket: "figurinhas-5534c.firebasestorage.app",
  messagingSenderId: "881220787425",
  appId: "1:881220787425:web:f7f1b7378414135cd72ba0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Elementos DOM visuais 
const authScreen = document.getElementById("auth-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const jogadorGrid = document.getElementById("pizza-grid");

// Elementos DOM login
const inputEmail = document.getElementById('auth-email');
const inputSenha = document.getElementById("auth-senha");

// Elementos DOM da pizza
const inputNome = document.getElementById("jogador-nome");
const inputSelecao = document.getElementById("jogador-selecao");
const inputPosicao = document.getElementById("jogador-posicao");
const inputCamisa = document.getElementById("jogador-numero");
const inputImagem = document.getElementById("jogador-imagem");

// Função para validação do usuário
onAuthStateChanged(auth, (user) => {
    if (user) {
        authScreen.classList.add("hidden");
        dashboardScreen.classList.remove("hidden");
        document.getElementById('user-display-name').textContent = user.displayName || user.email;
        carregarCardapio();
    } else {
        authScreen.classList.remove("hidden");
        dashboardScreen.classList.add("hidden");
        pizzaGrid.innerHTML = "";
    }
});

// Login e Cadastro
// Cadastro ~> createUserWithEmailPassword
document.getElementById("btn-cadastro").addEventListener("click", async () => {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if(!senha || !email) return alert("Preencha email e senha.");
    try{
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta administrativa criada com sucesso!")
    } catch(e){ alert(e.message); }
});

// Login ~> singInWithEmailAndPassword
document.getElementById("btn-login").addEventListener("click", async () => {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if(!senha || !email) return alert("Preencha email e senha.");
    try{
        await signInWithEmailAndPassword(auth, email, senha);
    } catch(e){ alert(e.message); }
});

// Login com Google
document.getElementById("btn-google").addEventListener("click", async () => {
    try{
        await signInWithPopup(auth, googleProvider)
    } catch(e){ alert("Erro Google: " + e.message); }
})

// Logout ~> Sair
document.getElementById("btn-logout").addEventListener("click", () => signOut(auth));

// Cadastrar Pizza
document.getElementById("btn-cadastrar").addEventListener("click", async()=>{
    const nome = inputNome.value.trim();
    const ingredientes = inputPosicao.value.trim();
    const tipo = inputSelecao.value;
    const preco = inputCamisa.value.trim();
    const imagem = inputImagem.value.trim();

    if(!nome || !ingredientes || !preco) return alert("Preencha os campos obrigatórios");

    try{
        await addDoc(collection(db, "pizzas"), {
            nome,
            ingredientes,
            tipo,
            preco: Number(preco),
            imagem
        });
        inputNome.value = "";
        inputPosicao.value = "";
        inputCamisa.value = "";
        inputImagem.value = "";
    } catch(e){ console.error(e); };
});

// Carregar o Cardápio ~> Pizzas cadastradas
function carregarCardapio(){
    const q = query(collection(db, "pizzas"), orderBy("nome", "asc"));

    onSnapshot(q, (snapshot)=>{
        pizzaGrid.innerHTML = "";
        if(snapshot.empty){
            pizzaGrid.innerHTML = "<p class = 'loading-text'>Nenhuma Pizza Cadastrada</p>";
            return;
        }
        snapshot.forEach((doc) => {
            const p = doc.data();
            const imgUrl = p.imagem || "https://tetraconind.com.br/wp-content/themes/atom-theme/assets/img/default-img.png";

            const classeBadge = p.tipo === "Doce"? "badge doce" : "badge";

            const card = document.createElement("div");
            card.classList.add("pizza-card");
            card.innerHTML = `
                <img src = "${imgUrl}" class = "pizza-img" alt = "${p.nome}">
                <div class = "pizza-info">
                    <h4>${p.nome}</h4>
                    <p class = "pizza-desc">${p.ingredientes}</p>
                    <div class = "pizza-meta">
                        <span class = "pizza-price">R$ ${parseFloat(p.preco).toFixed(2)}</span>
                        <span class = "${classeBadge}">${p.tipo}</span>
                    </div>
                </div>
            `;
            pizzaGrid.appendChild(card);
        });
    });
};