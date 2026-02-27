const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const validarPlaca = prisma.carros.length();
    if(validarPlaca == 7){
        const carro = await prisma.carros.create({
            data
        }).toUpperCase().trim().replace(" ", "");
        res.json(carro).status(201).end();
    } else{
        res.status(500).send().end();
    }
};

const listar = async (req, res) => {
    const lista = await prisma.carros.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const aluno = await prisma.carros.findUnique({
        where: { id: Number(id) }
    });

    res.json(aluno).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const aluno = await prisma.carros.update({
        where: { id: Number(id) },
        data: dados
    });

    res.json(aluno).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const aluno = await prisma.carros.delete({
        where: { id: Number(id) }
    });

    res.json(aluno).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}