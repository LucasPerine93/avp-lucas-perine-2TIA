import prisma from "../config/prisma.js";

export function criar({numero, nome, equipe}) {
    return prisma.piloto.create({
        data: {
            numero,
            nome,
            equipe
        }
    });
}

export function listar() {
    return prisma.piloto.findMany({});
}

export function buscarPorId(id) {
    return prisma.piloto.findUnique({
        where: { id }
    });
}

export function buscarPorNumero(numero) {
    return prisma.piloto.findFirst({
        where: { numero }
    });
}

export function buscarPorNome(nome) {
    return prisma.piloto.findFirst({
        where: { nome }
    });
}

export function atualizar(id, { numero, nome, equipe }) {
    return prisma.piloto.update({
        where: { id },
        data: {
            numero: numero,
            nome: nome,
            equipe: equipe
        }
    });
}

export function deletar (id) {
    return prisma.piloto.delete({
        where: { id }
    });
} 