const prisma = require("../data/prisma");

const dataOuParticipantes = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const numeroInscricoes = evento.inscricoes.filter(inscricao => inscricao.status == "CONFIRMADA").length;

    if (evento && evento.data_evento) {
        const dataEvento = new Date(evento.data_evento).getTime();
        const diferenca = dataEvento - Date.now();
        const diferencaHoras = diferenca / (1000 * 60 * 60);

        if (diferencaHoras < 0) {
            throw new Error("Erro ao cancelar, o evento já passou");
        }
    }
    if (numeroInscricoes > 0) {
        throw new Error("Erro ao cancelar, este evento tem participantes");
    }
}

const cancelarGeral = async (eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const statusEncerrado = evento.inscricoes.filter(inscricao => inscricao.status == "ENCERRADO");

    if (statusEncerrado) {
        await prisma.inscricoes.update({
            where: { id: evento.inscricoes.id },
            data: { status: "CANCELADA" }
        });
    }
};

module.exports = {
    dataOuParticipantes,
    cancelarGeral
}