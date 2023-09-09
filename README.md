# CronJob
Encargado de llevar seguimiento de todas las marcas temporales de los usuarios, y notificar de los eventos necesarios.
Requisitos: Postman u otra herramiento para probar apis, correo de gmail, vscode y node
Instruciones: ejecutar 'npm start' o 'node server.js', en caso de que de error por las librerias ejecutar 'node install express node-cron nodemailer'
Peticion:
POST: localhost:3000/api/notificaciones/notificar
Body: Se debe modificar la hora en el día en el que se realizará la prueba, es conveniente que sea cercana a la actual, la notificación se activará diez minutos antes
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
        }
    ]
}
