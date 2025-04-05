import db from '../config/db.js';

/**
 * Inserta un archivo en la base de datos.
 * @param {number} userId - ID del usuario.
 * @param {string} name - Nombre del archivo.
 * @param {string} type - Tipo MIME del archivo.
 * @param {string} path - Ruta del archivo en S3.
 */
export const createFile = async (userId, name, type, path) => {
    return await db.query(
        'INSERT INTO files (user_id, name, type, path) VALUES (?, ?, ?, ?)',
        [userId, name, type, path]
    );
};

/**
 * Obtiene todos los archivos de un usuario.
 * @param {number} userId - ID del usuario.
 */
export const getFilesByUser = async (userId) => {
    const [rows] = await db.query('SELECT * FROM files WHERE user_id = ?', [userId]);
    return rows;
};

/**
 * Obtiene un archivo específico por ID.
 * @param {number} fileId - ID del archivo.
 * @param {number} userId - ID del usuario.
 */
export const getFileById = async (fileId, userId) => {
    const [rows] = await db.query('SELECT * FROM files WHERE id = ? AND user_id = ?', [fileId, userId]);
    return rows[0];
};