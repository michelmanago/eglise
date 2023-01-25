import prisma from '@/lib/prisma';

export async function createUser(user) {
    const {name, email, password, role, hash} = user;
    try {
        const res = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
                validate: false,
                hash,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUsers() {
    const res = await prisma.user.findMany();
    return res;
}

export async function getUserById(userId) {
    const res = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return res;
}

export async function getUserByHash(hash) {
    const res = await prisma.user.findMany({
        where: {
            hash,
        },
    });
    return res.length > 0 ? res[0] : null;
}

export async function getUserByEmail(userEmail) {
    const res = await prisma.user.findMany({
        where: {
            email: userEmail,
        },
    });
    return res.length > 0 ? res[0] : null;
}

export async function updateUser(user) {
    const {id, name, email, role, tombe} = user;
    const res = await prisma.user.update({
        where: {
            id,
        },
        data: {
            name,
            email,
            role,
            tombe,
        },
    });
    return res;
}

export async function updateUserHash(userId, hash) {
    const res = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            hash,
        },
    });
    return res;
}

export async function activateUser(userId) {
    const res = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            validate: true,
            hash: null,
        },
    });
    return res;
}

export async function updateUserPassword(userId, password) {
    const res = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password,
            hash: null,
        },
    });
    return res;
}

export async function deleteUser(user) {
    const userDelete = await prisma.user.delete({
        where: {
            id: user.id,
        },
    });
    return userDelete;
}
