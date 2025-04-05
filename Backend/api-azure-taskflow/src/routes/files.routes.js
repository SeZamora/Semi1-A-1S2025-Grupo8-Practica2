import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// obtener archivo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const [files] = await pool.query('SELECT * FROM files WHERE user_id = ?', [id]);
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el archivo' });
  }
})

export default router;