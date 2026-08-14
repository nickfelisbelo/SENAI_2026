const { getPrismaClient } = require("@prisma/client/runtime/client");
const prisma = require("../data/prisma");
const { dataOuParticipantes, cancelarGeral } = require("../services/eventos.services");

const cadastrar = async (req, res) => {
    const data = req.body;

    data.data_evento = new Date(data.data_evento);

    const item = await prisma.eventos.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.eventos.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.eventos.findUnique({
        where: { id: Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const item = await prisma.eventos.update({
            where: { id: Number(id) },
            data: dados
        });

        await cancelarGeral(Number(id));

        res.json(item).status(200).end();
    } catch (error) {
        res.json(error.toString()).status(500).end();
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        await dataOuParticipantes(Number(id));

        const item = await prisma.eventos.delete({
            where: { id: Number(id) }
        });

        res.json(item).status(200).end();
    } catch (error) {
        res.json(error.toString()).status(500).end();
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
