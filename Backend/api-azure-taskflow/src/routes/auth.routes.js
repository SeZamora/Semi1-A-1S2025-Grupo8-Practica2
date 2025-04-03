import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js'; // Tu configuración de base de datos

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password, profile_picture } = req.body;
    if (!username || !email || !password || !profile_picture) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length) return res.status(400).json({ message: 'El usuario ya existe' });
    
      const [result] = await pool.query(
          'INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)',
          [username, email, hashedPassword, profile_picture]
      );
      res.status(201).json({ message: 'Usuario registrado', user_id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }

});

// Login de usuario
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

      if (!users.length) return res.status(400).json({ message: 'Credenciales incorrectas' });

      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) return res.status(400).json({ message: 'Credenciales incorrectas' });

      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });

      res.json({ user_id: user.id, username: user.username, email: user.email, profile_picture: user.profile_picture, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Obtener perfil del usuario autenticado
// router.get('/profile', async (req, res) => {
//     const [users] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [req.user.userId]);
//     res.json(users[0]);
// });

// Prueba hola mundo
router.get('/hello', (req, res) => {
    res.json({ message: 'Hola mundo' });
});

export default router;
