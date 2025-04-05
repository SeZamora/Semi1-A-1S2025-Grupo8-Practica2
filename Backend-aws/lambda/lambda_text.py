import boto3
import base64
import os
import json
import time

# Inicializar el cliente de S3
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        if isinstance(event.get('body'), str):
            event = json.loads(event['body'])
        
        # Parsear el cuerpo de la solicitud
        body = event
        file_name = body['fileName']
        file_type = body['fileType']
        file_content = body['fileContent']

        # Decodificar el contenido del archivo (Base64)
        decoded_content = base64.b64decode(file_content)

        # Configurar los parámetros de subida
        bucket_name = 'practica2semi1a1s2025archivosg8'
        key = f"archivos/{int(time.time())}-{file_name}"

        # Cargar el archivo al bucket S3
        s3.put_object(Bucket=bucket_name, Key=key, Body=decoded_content, ContentType=file_type)

        # Generar la URL del archivo
        file_url = f"https://{bucket_name}.s3.amazonaws.com/{key}"

        return {
            'statusCode': 201,
            'body': json.dumps({
                'message': 'Archivo de texto subido correctamente',
                'fileUrl': file_url
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Error al subir el archivo de texto',
                'details': str(e)
            })
        }