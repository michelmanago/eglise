import prisma from '@/lib/prisma';

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
