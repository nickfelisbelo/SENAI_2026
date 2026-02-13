const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const aluno = await prisma.alunos.create({
        data
    });

    res.json(aluno).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.alunos.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const aluno = await prisma.alunos.findUnique({
        where: { id: Number(id) }
    });

    res.json(aluno).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const aluno = await prisma.alunos.update({
        where: { id: Number(id) },
        data: dados
    });

    res.json(aluno).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const aluno = await prisma.alunos.delete({
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
