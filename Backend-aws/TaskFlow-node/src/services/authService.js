import db from '../config/db.js';

/**
 * Inserta un nuevo usuario en la base de datos.
 * @param {string} username - Nombre del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} hashedPassword - Contraseña encriptada.
 * @param {string} profilePicture - URL de la imagen de perfil.
 */
export const createUser = async (username, email, hashedPassword, profilePicture) => {
    return await db.query(
        'INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, profilePicture]
    );
};

/**
 * Busca un usuario por su correo electrónico.
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Object} Usuario encontrado o null si no existe.
 */
export const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

/**
 * Busca un usuario por su nombre de usuario.
 * @param {string} username - Nombre de usuario.
 * @returns {Object} Usuario encontrado o null si no existe.
 */
export const findUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

/**
 * Busca un usuario por su ID.
 * @param {number} userId - ID del usuario.
 * @returns {Object} Usuario encontrado o null si no existe.
 */
export const findUserById = async (userId) => {
    const [rows] = await db.query('SELECT id, username, email, profile_picture FROM users WHERE id = ?', [userId]);
    return rows[0];
};