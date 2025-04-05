import { Router } from 'express';
import { uploadImage, uploadDocument, listFiles, getFile } from '../controllers/files.js';
import upload from '../middlewares/upload.js';

const router = Router();

//router.post('/upload/image', upload.single('file'), uploadImage); // Subir imagen
//router.post('/upload/document', upload.single('file'), uploadDocument); // Subir documento
router.get('/files/:user_id', listFiles); // Listar archivos

// no se esta usando por ahora
//router.get('/singlefile/:id', getFile); // Obtener archivo específico

export default router;