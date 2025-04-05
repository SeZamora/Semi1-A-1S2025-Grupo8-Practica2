import AWS from 'aws-sdk';
import fetch from 'node-fetch'; // Asegúrate de instalar node-fetch si no lo tienes: npm install node-fetch
import { createFile, getFilesByUser, getFileById } from '../services/fileService.js';

// Configurar AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const apiGateway = process.env.API_GATEWAY_URL;

export const uploadImage = async (req, res) => {
    const { file } = req;
    const { user_id } = req.body;

    if (!file) {
        return res.status(400).json({ error: 'No se ha proporcionado el archivo' });
    }
    if (!user_id) {
        return res.status(400).json({ error: 'No se ha proporcionado el ID del usuario' });
    }

    try {
        // Leer el archivo y convertirlo a Base64
        const base64Content = file.buffer.toString('base64');

        // Enviar el archivo a la función Lambda
        const response = await fetch(`${apiGateway}/cargarImagen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: file.originalname,
                fileType: file.mimetype,
                fileContent: base64Content,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: 'Error al cargar la imagen', details: result });
        }

        // Guardar la información del archivo en la base de datos
        await createFile(user_id, file.originalname, file.mimetype, result.fileUrl);

        res.status(201).json({ message: 'Imagen subida correctamente', path: result.fileUrl });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al subir la imagen', details: error.message });
    }
};

export const uploadDocument = async (req, res) => {
    const { file } = req;
    const { user_id } = req.body;

    if (!file) {
        return res.status(400).json({ error: 'No se ha proporcionado el archivo' });
    }
    if (!user_id) {
        return res.status(400).json({ error: 'No se ha proporcionado el ID del usuario' });
    }


    try {
        // Leer el archivo y convertirlo a Base64
        const base64Content = file.buffer.toString('base64');

        // Enviar el archivo a la función Lambda
        const response = await fetch(`${apiGateway}/cargarArchivo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: file.originalname,
                fileType: file.mimetype,
                fileContent: base64Content,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: 'Error al cargar el archivo de texto', details: result });
        }

        // Guardar la información del archivo en la base de datos
        await createFile(user_id, file.originalname, file.mimetype, result.fileUrl);

        res.status(201).json({ message: 'Documento subido correctamente', path: result.fileUrl });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al subir el documento', details: error.message });
    }
};

export const listFiles = async (req, res) => {
    const { user_id } = req.params;

    try {
        const files = await getFilesByUser(user_id);
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los archivos' });
    }
};

// Ya no se usa
export const getFile = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const file = await getFileById(id, userId);

        if (!file) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.path,
        };

        const fileStream = s3.getObject(params).createReadStream();

        res.setHeader('Content-Type', file.type);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Error al tratar de obtener el archivo' });
    }
};