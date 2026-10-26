import prisma from "../config/prisma";

export function criar({numero, nome, equipe}) {
    return prisma.piloto.create({
        data: {
            numero,
            nome,
            equipe
        }
    });
}