import db from '../config/db.js';

/**
 * Obtiene todas las tareas de un usuario.
 * @param {number} userId - ID del usuario.
 * @returns {Array} Lista de tareas.
 */
export const getTasksByUser = async (userId) => {
    const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
};

/**
 * Crea una nueva tarea.
 * @param {number} userId - ID del usuario.
 * @param {string} title - Título de la tarea.
 * @param {string} description - Descripción de la tarea.
 * @returns {Object} Resultado de la inserción.
 */
export const createTask = async (userId, title, description) => {
    return await db.query(
        'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
        [userId, title, description]
    );
};

/**
 * Actualiza una tarea existente.
 * @param {number} taskId - ID de la tarea.
 * @param {number} userId - ID del usuario.
 * @param {string} title - Nuevo título de la tarea.
 * @param {string} description - Nueva descripción de la tarea.
 * @returns {Object} Resultado de la actualización.
 */
export const updateTask = async (taskId, title, description) => {
    return await db.query(
        'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
        [title, description, taskId]
    );
};

/**
 * Elimina una tarea existente.
 * @param {number} taskId - ID de la tarea.
 * @param {number} userId - ID del usuario.
 * @returns {Object} Resultado de la eliminación.
 */
export const deleteTask = async (taskId) => {
    return await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
};

/**
 * Marca una tarea como completada.
 * @param {number} taskId - ID de la tarea.
 * @param {number} userId - ID del usuario.
 * @returns {Object} Resultado de la actualización.
 */
export const completeTask = async (taskId, completed) => {
    return await db.query(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed, taskId]
    );
};