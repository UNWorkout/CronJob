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
   POST: localhost:3000/api/notificaciones/notificar
4. **Body**: Se debe modificar la hora en el día en el que se realizará la prueba, es conveniente que sea cercana a la actual, la notificación se activará diez minutos antes
   ```bash
   {   
     "usuario_id": 1,
     "correo": "correo de prueba gmail",
     "dias_semana": [
         {
         "dia": "Domingo",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         },
         {
         "dia": "Lunes",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         },
         {
         "dia": "Martes",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         },
         {
         "dia": "Miercoles",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         },
         {
         "dia": "Jueves",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         },
         {
         "dia": "Viernes",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         },
         {
         "dia": "Sabado",
         "ejercicios": ["ejercicio1", "ejercicio2"],
         "Hora_inicio": "22:30"
         }]
   }

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
