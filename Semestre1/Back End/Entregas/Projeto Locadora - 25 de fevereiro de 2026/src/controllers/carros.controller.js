const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;
    const placaRep = req.params.placa;
    const infoCarro = data.marcaemodelo.toLowerCase().split(" ");
    data.marca = infoCarro[0];
    data.modelo = infoCarro[1];
    const numPalavras = infoCarro.length;
    const ano = data.ano.length;

    const placa = data.placa.trim().replace(" ", "").replace("-", "").toUpperCase();

    if(placa.length != 7 && placa == placaRep && numPalavras < 2 && ano != 4 && placa.includes("")){
        res.json("Erro").status(500).end();
    } else{
        delete data.marcaemodelo;

        const carro = await prisma.carros.create({
            data
        });

        res.json(carro).status(201).end();
    }

};

const listar = async (req, res) => {
    const lista = await prisma.carros.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { placa } = req.params;

    const carro = await prisma.carros.findUnique({
        where: { id: placa }
    });

    res.json(carro).status(200).end();
};

const atualizar = async (req, res) => {
    const { placa } = req.params.placa;
    const data = req.body;

    const carro = await prisma.carros.update({
        where: { id: placa },
        data
    });

    res.json(carro).status(200).end();
};

const excluir = async (req, res) => {
    const { placa } = req.params.placa;

    const carro = await prisma.carros.delete({
        where: { id: placa }
    });

    res.json(carro).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}