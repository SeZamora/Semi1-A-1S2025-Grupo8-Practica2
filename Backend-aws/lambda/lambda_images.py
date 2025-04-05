import time
import boto3
import base64
import os
import json

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        if isinstance(event.get('body'), str):
            event = json.loads(event['body'])
        
        body = event
        file_name = body['fileName']
        file_type = body['fileType']
        file_content = body['fileContent']

        # Decodificar el contenido del archivo (Base64)
        file_data = base64.b64decode(file_content)

        # Configurar los parámetros de subida
        bucket_name = 'practica2semi1a1s2025archivosg8'
        key = f"imagenes/{int(time.time())}-{file_name}"

        # Subir el archivo a S3
        s3.put_object(Bucket=bucket_name, Key=key, Body=file_data, ContentType=file_type)

        # Generar la URL del archivo
        file_url = f"https://{bucket_name}.s3.amazonaws.com/{key}"

        return {
            'statusCode': 201,
            'body': json.dumps({
                'message': 'Imagen cargada correctamente',
                'fileUrl': file_url
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Error al cargar la imagen',
                'details': str(e)
            })
        }