import {
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
} from '../services/taskService.js';

export const getTasks = async (req, res) => {
    const { id: userId } = req.params;

    try {
        const tasks = await getTasksByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

export const createTaskController = async (req, res) => {
    const { title, description, user_id } = req.body;

    try {
        const [result] = await createTask(user_id, title, description);
        res.status(201).json({ id: result.insertId, title, description });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea', details: error });
    }
};

export const updateTaskController = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const [result] = await updateTask(id, title, description);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No se ha encontrado la tarea' });
        }

        res.json({ message: 'Tarea actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

export const deleteTaskController = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await deleteTask(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

export const completeTaskController = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const [result] = await completeTask(id, completed);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Operación realizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error en la operación de la tarea' });
    }
};