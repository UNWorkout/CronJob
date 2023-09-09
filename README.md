# CronJob
Encargado de llevar seguimiento de todas las marcas temporales de los usuarios, y notificar de los eventos necesarios.<br>
Requisitos: Postman u otra herramiento para probar apis, correo de gmail, vscode y node <br>
Instruciones: ejecutar 'npm start' o 'node server.js', en caso de que de error por las librerias ejecutar 'node install express node-cron nodemailer'<br>
Peticion:<br>
POST: localhost:3000/api/notificaciones/notificar<br>
Body: Se debe modificar la hora en el día en el que se realizará la prueba, es conveniente que sea cercana a la actual, la notificación se activará diez minutos antes<br>
{<br>
    "usuario_id": 1,<br>
    "correo": "correo de prueba gmail",<br>
    "dias_semana": [<br>
        {<br>
        "dia": "Domingo",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        },<br>
        {<br>
        "dia": "Lunes",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        },<br>
        {<br>
        "dia": "Martes",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        },<br>
        {<br>
        "dia": "Miercoles",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        },<br>
        {<br>
        "dia": "Jueves",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        },<br>
        {<br>
        "dia": "Viernes",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        },<br>
        {<br>
        "dia": "Sabado",<br>
        "ejercicios": ["ejercicio1", "ejercicio2"],<br>
        "Hora_inicio": "22:30"<br>
        }<br>
    ]<br>
}<br>
Respuesta Postman:<br>
{<br>
    "mensaje": "Notificación programada con exito"<br>
}<br><br>
Respuesta Consola:<br>
Servidor API REST en ejecución en el puerto 3000 (correcta ejecucion de server.js) <br>
Notificación enviada (correcta ejecucion de CronJob) <br>
Correo electrónico enviado con éxito: (correcta ejecucion de SendMail)<br>
