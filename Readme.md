# MANUAL TECNICO

## 1. Estudiantes
- Jhonatan Josué Tzunún Yax - 201900831
- Jorge Sebastian Zamora Polanco - 202002591
- Eddy Alejandro Murga Barillas - 201503741
- Erick Estuardo Muñoz Escalante - 201602947

## 2. Arquitectura Utilizada
La arquitectura utilizada en el proyecto está basada en servicios de Amazon Web Services (AWS) y Microsoft Azure. Se diseñó para proporcionar escalabilidad, alta disponibilidad y seguridad. Los principales componentes incluyen:

- **Amazon S3** para almacenamiento de archivos estáticos.
- **EC2** para alojar las aplicaciones backend.
- **RDS** para la base de datos relacional.
- **Lambda** para ejecutar funciones sin servidor.
- **API Gateway** para gestionar las APIs.
- **Azure Blob Storage** para almacenar archivos.
- **Azure VM** para instancias de máquinas virtuales.
- **Azure Functions** para funciones sin servidor.

## 3. Descripción de los Diferentes Usuarios de IAM en Amazon
A continuación, se describen los usuarios de IAM (Identity and Access Management) creados en AWS, junto con sus respectivas políticas:

- **Usuario 1: AdministradorLambda**
  - **Políticas**: `AmazonAPIGatewayAdministrator`, `AWSLambda_FullAccess`, `IAMFullAccess`
  - Descripción: Tiene acceso completo para administrar, visualizar y modificar las funciones lambda; de la misma manera, tiene control sobre las **api gateway** utilizadas en conjunto con las **funciones lambda**.
  
- **Usuario 2: AdministradorS3**
  - **Políticas**: `AmazonS3FullAccess`, `IAMFullAccess`
  - Descripción: Se encarga de administrar las configuraciones de los buckets de AWS.

- **Usuario 3: AdministradorEC2**
  - **Políticas**: `AmazonEC2FullAccess`, `IAMFullAccess`
  - Descripción: Encargado del manejo de las instancias EC2 junto con su balanceador de carga.

## 4. Capturas de Pantalla de los Recursos

### a. AWS
- **Buckets de Amazon S3**:
  ![Bucket de S3](./Imagenes%20Manual/buckets.png)
  
- **Instancias de EC2**:
  ![Instancia EC2](ruta/a/tu/captura_de_pantalla_EC2.png)
  
- **Balanceador de Carga de EC2**:
  ![Balanceador de Carga EC2](ruta/a/tu/captura_de_pantalla_balanceador.png)

- **Base de Datos de RDS**:
  ![Base de Datos RDS](ruta/a/tu/captura_de_pantalla_RDS.png)

- **Funciones Lambda**:
  ![Función Lambda](./Imagenes%20Manual/lambda_functions.png)

- **Configuración de API Gateway**:
  ![API Gateway](./Imagenes%20Manual/api_gateway.png)

### b. Azure
- **Blob Containers de Azure**:
  ![Blob Containers de Azure](./Imagenes%20Manual/captura_blob.png)

- **Instancias de VM de Azure**:
  ![Instancia VM Azure](./Imagenes%20Manual/captura_de_pantalla_VM.png)


- **Balanceador de Carga de Azure**:
  ![Balanceador de Carga Azure](./Imagenes%20Manual/captura_balanceador.png)

- **Funciones de Azure Functions**:
  ![Funciones Azure](./Imagenes%20Manual/captura_Funciones.png)

- **Configuración de API Management**:
  ![API Management](./Imagenes%20Manual/caputura_api.png)


## Diagrama
![image](https://github.com/user-attachments/assets/d5bc3736-6672-4447-ada2-1fafdafb5114)


## 5. Conclusión

AWS es más completo y versátil, con una cantidad enorme de servicios y opciones. Sin embargo, esa misma variedad a veces puede ser abrumadora, sobre todo al principio, porque cada servicio tiene muchas configuraciones y detalles que hay que entender bien.

Por otro lado, Azure es más intuitivo. La integración entre servicios es fluida y la interfaz es más amigable, lo cual facilita bastante el desarrollo si ya se está en ese entorno.

En resumen, si se necesita elegir una plataforma según el tipo de proyecto, AWS es para proyectos muy específico o altamente configurables, pero Azure es cuando se busca rapidez, simplicidad y una buena integración con herramientas de Microsoft.
