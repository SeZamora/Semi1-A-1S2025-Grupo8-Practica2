import express from 'express';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import fileRoutes from './routes/files.js';
import cors from 'cors';
import db from './config/db.js'; // Importa la conexión a la base de datos

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', authRoutes); // Rutas de autenticación
app.use('/tasks', taskRoutes); // Rutas de gestión de tareas
app.use('/', fileRoutes); // Rutas de gestión de archivos

// Ruta para probar la conexión con la base de datos
app.get('/test-db', async (req, res) => {
    try {
        await db.query('SELECT 1'); // Consulta simple para verificar la conexión
        res.status(200).json({ message: 'Database connection is working!' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});