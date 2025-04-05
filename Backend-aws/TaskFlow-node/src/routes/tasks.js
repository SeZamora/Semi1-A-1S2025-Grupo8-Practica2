import { Router } from 'express';
import {
    getTasks,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    completeTaskController,
} from '../controllers/tasks.js';

const router = Router();

router.get('/:id', getTasks); // Obtener tareas
router.post('/', createTaskController); // Crear tarea
router.put('/:id', updateTaskController); // Editar tarea
router.delete('/:id', deleteTaskController); // Eliminar tarea
router.patch('/:id/complete', completeTaskController); // Marcar tarea como completada

export default router;