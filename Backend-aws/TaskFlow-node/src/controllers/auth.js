import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserByUsername, findUserById } from '../services/authService.js';

export const register = async (req, res) => {
    const { username, email, password, profile_picture } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        await createUser(username, email, hashedPassword, profile_picture);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.json({ user_id: user.id, username: user.username, email: user.email, profile_picture: user.profile_picture, token });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }
};

export const profile = async (req, res) => {
    const { userId } = req.body;

    try {
        // Buscar el usuario por ID
        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'No se ha encontrado al usuario' });
        }

        res.json({user_id: user.id, username: user.username, email: user.email, profile_picture: user.profile_picture});
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el perfil del usuario', details: error });
    }
};