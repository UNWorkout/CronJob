import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { gql } from '@apollo/client';
const cron = require('node-cron');
const express = require('express');
const correoService = require('../SendMail'); 

const app = express();

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  cache: new InMemoryCache(),
});

// Simula una función para obtener el correo del usuario desde la base de datos
function obtenerCorreoDelUsuario(id) {
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
app.post('/notificar/:id', async (req, res) => {
    //obtener datos de req
    const correo = obtenerCorreoDelUsuario(req.params.id);
    // Definir la consulta GraphQL
    const GET_ROUTINE_USER = gql`
      query {
        routineUser(ID: ${req.params.id}) {
          dias_semana {
            Duracion_Max
            Hora_inicio
            dia
            ejercicios
          }
        }
      }
      `;
  // Realizar la solicitud GraphQL
  client.query({
    query: GET_ROUTINE_USER,
  })
    .then((response) => {
      const routineUserData = response.data.routineUser;
      //obtiene el dia de la semana actual
      const fechaActual = new Date();
      let diaDeLaSemana = fechaActual.getDay();
      // Mapear el número del día actual al nombre del día de la semana
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      const diaActual = diasSemana[diaDeLaSemana];
      //si hay ejercicios programados para el dia, se notifica con 10 minutos de anticipacion
      let val = false;  
      for (let i = 0; i < routineUserData.dias_semana.length; i++) {
          if (routineUserData.dias_semana[i].dia == diaActual) {
              diaDeLaSemana = i;
              val = true;
              break;
          }
      }
      if (val && routineUserData.dias_semana[diaDeLaSemana].ejercicios.length > 0) {
          const horaInicio = routineUserData.dias_semana[diaDeLaSemana].Hora_inicio; 
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
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud:', error);
    });
});

module.exports = app;

/*
const GET_ROUTINE_USER = gql`
  query getRoutineUser($id: ID) {
    routineUser(ID: $id) {
      dias_semana {
        Duracion_Max
        Hora_inicio
        dia
        ejercicios
      }
    }
  }
`;
si no funciona, probar con esta
*/