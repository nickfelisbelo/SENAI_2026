const connection = require("../data/connection");

const prisma = require("../data/prisma");

const listadois = async (req, res) => {
    try{
        const lista = await prisma.lista.findMany();

        res.json(lista).status(200).end();
    }catch(err){
        res.json(err).status(500).end();
    }
}

const listarItens = async (req, res) => {
    try{
        const [listar] = await connection.query("SELECT * FROM lista");

        res.json(listar).status(200).end();
    }catch(err){
        res.json(err).status(500).end();
    }
}

// const cadastrasItens = async (req, res) => {
//     try{
//         const {item, valor} = req.body;
//         const cadastrar = await connection.query("INSERT INTO lista(item, valor) VALUES(?, ?)", [item, valor]);

//         res.send({
//             id: cadastrar.insertId,
//             item: item,
//             valor: valor
//         }).status(200).end();
//     }catch(err){
//         res.send("Erro").status(500).end();
//         console.log(err);
//     }
// }

const cadastrarItens = async (req, res) =>{
    try{
        const item = req.body;

        const novoItem = await prisma.lista.create({
            data: item
        });

        res.json(novoItem).status(201).end();
    }catch(err){
        res.json(err).status(500).end();
    }
}

const atualizarItem = async (req, res) =>{
    try{
        const {id} = req.params;
        const item = req.body;

        const atualizar = await prisma.lista.update({
            where: { id: Number(id) },
            data: item
        });

        res.json(atualizar).status(200).end();
    }catch(err){
        res.send(err).status(500).end();
        console.log(error);
    }
}

const deleteItem = async (req, res) =>{
    try{
        const {id} = req. params;

        const excluir = await prisma.lista.delete({
            where: {id: Number(id)}
        });

        res.send("Deletado com sucesso").status(200).end();
    }catch(err){
        res.send(err).status(500).end();
    }
}

module.exports = {
    listarItens,
    cadastrarItens,
    listadois,
    atualizarItem,
    deleteItem
}