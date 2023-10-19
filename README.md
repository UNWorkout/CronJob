## Requisitos: 
Postman u otra herramiento para probar apis, correo de gmail, vscode, Docker y node(v18.17.1) <br>
## Instruciones:
1. ejecutar
   ```bash
   node server.js
2. en caso de que de error por las librerias ejecutar
   ```bash
   node install express node-cron nodemailer
3. Peticion:
   ```bash
   POST: localhost:3000/api/notificaciones/notificar/id 
4. **Body**: modificar id con el identificador del usuario en la APi, la peticion es RoutineUser: Routine
   
**Respuesta Postman:** <br>
    "mensaje": "Notificación programada con exito"<br>
**Respuesta Consola:** <br>
Servidor API REST en ejecución en el puerto 3000 (correcta ejecucion de server.js) <br>
Notificación enviada (correcta ejecucion de CronJob) <br>
Correo electrónico enviado con éxito: (correcta ejecucion de SendMail)<br><br>
**Despliegue en Docker:**<br>
1. EJecutar el siguiente comando para construir la imagen de Docker, la aplicacion deve de estar abierta en el momento.
   ```bash
   docker build -t unworkout_cronjob_ms . 
3. Ejecutar el contenedor
   ```bash
   docker run -p 3000:3000 -d unworkout_cronjob_ms
