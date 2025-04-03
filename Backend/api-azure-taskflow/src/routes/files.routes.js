import express from 'express';

const router = express.Router();

// subir archivo
router.post('/', async (req, res) => {
  const { file } = req.files;
  const { user_id } = req.body;
  if (!file || !user_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const filePath = `uploads/${file.name}`;
    await file.mv(filePath);
    res.status(201).json({ message: 'Archivo subido exitosamente', filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al subir el archivo' });
  }
})