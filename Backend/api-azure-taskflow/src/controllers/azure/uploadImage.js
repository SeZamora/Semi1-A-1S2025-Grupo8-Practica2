const { BlobServiceClient } = require('@azure/storage-blob');
const mysql = require('mysql2/promise');

module.exports = async function (context, req) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_CONTAINER_IMAGES;

    const dbConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    };

    try {
        const fileBase64 = req.body?.file;
        const fileName = req.body?.fileName || 'documento.txt';
        const fileType = req.body?.fileType || 'application/octet-stream';
        const userId = req.body?.user_id;

        if (!fileBase64 || !userId) {
            context.res = {
                status: 400,
                body: 'Faltan datos necesarios: archivo o user_id.'
            };
            return;
        }

        // Subir al Blob Storage
        const buffer = Buffer.from(fileBase64, 'base64');
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(buffer, { blobHTTPHeaders: { blobContentType: fileType } });
        const fileUrl = blockBlobClient.url;

        // Insertar en la base de datos
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            `INSERT INTO files (user_id, name, type, path) VALUES (?, ?, ?, ?)`,
            [userId, fileName, fileType, fileUrl]
        );
        await connection.end();

        context.res = {
            status: 200,
            body: {
                message: `Archivo ${fileName} subido y registrado correctamente.`,
                url: fileUrl
            }
        };
    } catch (err) {
        context.log('Error:', err.message);
        context.res = {
            status: 500,
            body: 'Error al subir el archivo o insertar en la base de datos.'
        };
    }
};
