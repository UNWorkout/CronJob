const cron = require('node-cron');
const express = require('express');
const correoService = require('../SendMail'); 

const app = express();

// Simula una función para obtener el correo del usuario desde la base de datos
function obtenerCorreoDelUsuario(usuario_id,userMail) {
  return userMail;
}

//funcion encargada de transformar una hora en formato digital 00:00 a una hora en formato cron
function obtenerHoraCron(hora,dia){
    let [horaStr, minutoStr] = hora.split(':');
    let horaNum = parseInt(horaStr, 10);
    let minutoNum = parseInt(minutoStr, 10); 
    minutoNum = minutoNum - 10;
    if(minutoNum < 0){
        minutoNum = 60 + minutoNum;
        horaNum = horaNum - 1;
        if(horaNum < 0){
            horaNum = 24 + horaNum;
        }
    }
    /*formato cron:
    (second) minute hour dayMonth month dayWeek 
        *      *     *     *       *      *
      0-59   0-59  0-23  1-31    1-12   0-7 */
    return `${minutoNum} ${horaNum} * * ${dia}`;
}

//configuracion de la peticion
app.post('/notificar', (req, res) => {
    //obtener datos de req
    const usuarioId = req.body.usuario_id;
    const userMail = req.body.correo;
    const correo = obtenerCorreoDelUsuario(usuarioId,userMail);
    //obtiene el dia de la semana actual
    const fechaActual = new Date();
    const diaDeLaSemana = fechaActual.getDay();

    //si hay ejercicios programados para el dia, se notifica con 10 minutos de anticipacion
    if (req.body.dias_semana[diaDeLaSemana].ejercicios.length > 0) {
        const horaInicio = req.body.dias_semana[diaDeLaSemana].Hora_inicio; 
        const horaCron = obtenerHoraCron(horaInicio,diaDeLaSemana);
        cron.schedule(horaCron , () => {
            console.log('Notificación enviada');
            //enviar correo usando la funcionalidad creada en el archivo SendMail.js
            correoService.enviarCorreo(correo, 'Recordatorio de Ejercicios', 'Hola, recuerda que tienes ejercicios dentro de 10 minutos');
          }, {
            scheduled: true,
            timezone: 'America/Bogota',
          });
          res.json({ mensaje: 'Notificación programada con exito' });
    }else{
        console.log('No hay ejercicios para notificar');
    }
});

module.exports = app;