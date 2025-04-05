import multer from 'multer';

const storage = multer.memoryStorage(); // Almacena los archivos en memoria temporalmente
const upload = multer({ storage });

export default upload;