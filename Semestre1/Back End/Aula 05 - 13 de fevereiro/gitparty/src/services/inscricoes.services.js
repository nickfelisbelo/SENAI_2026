const prisma = require("../data/prisma");

const limiteInscricoes = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const numeroInscricoes = evento.inscricoes.filter(inscricao => inscricao.status == "CONFIRMADA").length;

    if (numeroInscricoes == evento.capacidade_maxima) {
        return "LISTA_ESPERA";
    } else {
        return "";
    }
}

const inscricaoDuplicada = async (usuarioId, eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const inscrito = evento.inscricoes.filter(inscricao => inscricao.usuariosId == usuarioId).length;

    if (inscrito == 1) {
        throw new Error("Usuário já inscrito no evento!");
    }
}

const prazoCancelamento = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    if (evento && evento.data_evento) {
        const dataEvento = new Date(evento.data_evento).getTime();
        const diferenca = dataEvento - Date.now();
        const diferencaHoras = diferenca / (1000 * 60 * 60);

        if (diferencaHoras < 24) {
            throw new Error("Erro ao cancelar, falta menos de 24 horas para o evento ou o evento já passou");
        }
    }
}

const promocao = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: { inscricoes: true }
    });

    const numeroInscricoes = evento.inscricoes.filter(inscricao => inscricao.status === "CONFIRMADA").length;

    if (numeroInscricoes < evento.capacidade_maxima) {
        const primeiroLista = await prisma.inscricoes.findFirst({
            where: {
                eventosId: eventoId,
                status: "LISTA_ESPERA"
            },
            orderBy: {
                data_inscricao: "asc"
            }
        });
        if (primeiroLista) {
            await prisma.inscricoes.update({
                where: { id: primeiroLista.id },
                data: { status: "CONFIRMADA" }
            });
        }
        console.log(primeiroLista);
    }
};

module.exports = {
    limiteInscricoes,
    inscricaoDuplicada,
    prazoCancelamento,
    promocao
}