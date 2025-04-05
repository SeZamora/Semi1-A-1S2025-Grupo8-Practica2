import { Router } from 'express';
import { register, login, profile } from '../controllers/auth.js';

const router = Router();

router.post('/register', register); // Registrar usuario
router.post('/login', login); // Iniciar sesión
router.post('/profile', profile); // Obtener perfil del usuario autenticado

export default router;