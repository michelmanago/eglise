import {query} from '@/lib/db';

//CREATE TABLE `user` (
//    `id` int(11) NOT NULL AUTO_INCREMENT,
//    `name` varchar(45) NOT NULL,
//    `email` varchar(100) NOT NULL,
//    `password` varchar(256) NOT NULL,
//    `role` varchar(45) DEFAULT 'admin',
//    `tombe` varchar(45) DEFAULT NULL,
//    PRIMARY KEY (`id`)
//);

export async function getUsers() {
    const results = await query(`
        SELECT id, name, email, role, tombe, validate FROM user;
    `);

    //console.log('getUsers => ', JSON.parse(JSON.stringify(results)));

    //return JSON.parse(JSON.stringify(results));
    return results;
}

export async function getUserById(userId) {
    const results = await query(
        `
        SELECT * FROM user
        WHERE id = ?;
        `,
        userId,
    );

    if (results.length >= 1) return results[0];
    else return null;
}

export async function getUserByHash(hash) {
    const users = await query(
        `
            SELECT id, name, email, role, tombe, validate FROM user where hash like ?;
        `,
        hash,
    );
    if (users.length >= 1) return users[0];
    else return null;
}

export async function getUserByEmail(userEmail) {
    const users = await query(
        `
            SELECT id, name, email, role, tombe FROM user where email like ?;
        `,
        userEmail,
    );
    if (users.length >= 1) return users[0];
    else return null;
}

export async function updateUser(user) {
    const {id, name, email, role, tombe} = user;
    const results = await query(
        `
        UPDATE user
        SET name = ?, 
            email = ?,
            role = ?,
            tombe = ?
        WHERE id = ?;
        `,
        [name, email, role, tombe, id],
    );
    return results;
}

export async function updateUserPassword(userId, password) {
    const results = await query(
        `
        UPDATE user
        SET password = ?,
        hash = ?
        WHERE id = ?;
        `,
        [password, null, userId],
    );
    return results;
}
