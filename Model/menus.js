import {query} from '@/lib/db';

//CREATE TABLE `menus` (
//    `id` int(11) NOT NULL AUTO_INCREMENT,
//    `name` varchar(45) NOT NULL,
//    `language` varchar(2) NOT NULL,
//    `string` varchar(45) NOT NULL,
//    `page` varchar(45) NOT NULL,
//    PRIMARY KEY (`id`)
//);

export async function getMenus() {
    const results = await query(`
        SELECT * FROM menus
        ORDER BY id DESC
        `
    );
    return results;
}

export async function getMenuById(menuId) {
    const results = await query(`
        SELECT * FROM menus
        WHERE id = ?
        ORDER BY id DESC
        `, id
    );
    return results[0];
}

export async function createMenu(menu) {
    const { name, language, string, page } = menu;
    const results = await query(`
        INSERT INTO menus (name, language, string, page)
        VALUES (?, ?, ?, ?)
        `, [name, language, string, page]
    );
    return results;
}

export async function updateMenu(menu) {
    const { id, name, language, string, page } = menu;
    const results = await query(`
        UPDATE menus
        SET name = ?, 
            language = ?,
            string = ?,
            page = ?
        WHERE id = ?
        `, [name, language, string, page, id]
    );
    return results;
}

export async function deleteMenu(menuId) {
    const results = await query(`
        DELETE FROM menus
        WHERE id = ?
        `, menuId
    );
    return results;
}