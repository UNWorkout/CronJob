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
        }
    ]
}
