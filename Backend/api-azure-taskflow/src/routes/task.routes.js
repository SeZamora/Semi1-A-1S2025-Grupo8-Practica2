import express from 'express';
import pool from '../config/db.js';

const router = express.Router();


// Crear tarea
router.post('/', async (req, res) => {
  const {title, description, user_id} = req.body;
  if (!title || !description || !user_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const [result] = await pool.query('INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [user_id, title, description]
    )
    res.status(201).json({ message: 'Tarea creada exitosamente', task_id: result.insertId})
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
})

// Obtener las tareas de un usuario
router.get('/:id', async (req, res) => {
  // id del usuario
  const { id } = req.params;
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [id]);
    res.status(200).json(tasks);
  } catch (error){
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
})

// Actualizar tarea
router.put('/:id', async (req, res) => {
  // id de la tarea a actualizar
  const { id } = req.params;
  const { title, description, completed = 0 } = req.body;
  try {
    const [result] = await pool.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', 
      [title, description, completed, id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea actualizada exitosamente' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
})

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  // id de la tarea a eliminar
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE user_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
})

// Cambiar estado de tarea
router.patch('/:id/complete', async (req, res) => {
  // id de la tarea a actualizar
  const { id } = req.params;
  const { completed } = req.body;
  if (completed === undefined) {
    return res.status(400).json({ message: 'El campo completed es obligatorio' });
  }
  try {
    const [result] = await pool.query('UPDATE tasks SET completed = ? WHERE id = ?', 
      [completed, id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Estado de la tarea actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la tarea' });
  }
})

export default router;