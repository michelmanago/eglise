import prisma from '@/lib/prisma';

export async function getAdherents() {
    const adherents = await prisma.adherent.findMany();

    return JSON.parse(JSON.stringify(adherents));
}

export async function getAdherent(id) {
    const adherent = await prisma.adherent.findUnique({
        where: {
            id,
        },
    });
    return JSON.parse(JSON.stringify(adherent));
}

export async function getAdherentToSendNews() {
    const adherents = await prisma.adherent.findMany({
        where: {
            news: true,
        },
    });

    return adherents;
}

export async function unsubscribeAdherent(email) {
    const res = await prisma.adherent.update({
        where: {
            email,
        },
        data: {
            news: false,
        },
    });
    return res;
}

export async function createAdherent(adherent) {
    const res = await prisma.adherent.create({
        data: adherent,
    });
    return res;
}

export async function updateAdherent(adherent) {
    const res = await prisma.adherent.update({
        where: {id: adherent.id},
        data: adherent,
    });
    return res;
}
