import db from './db.js';

async function getUserData(user, password) {
    try {
        const rows = await db.query(
            `SELECT nombre, rol 
             FROM usuarios
             WHERE login = ? AND password = ?`,
            [user, password]
        );

        //Comprobación directa sin helper
        const data = rows && rows.length > 0 ? rows[0] : null;

        return {
            data 
        };
    } catch (error) {
        console.error('Error en getUserData:', error);
        return {
            data: null
        };
    }
}

//Exportación correcta para ES modules
export default {
    getUserData
};