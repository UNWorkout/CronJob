const cron = require('node-cron');
const express = require('express');
const axios = require('axios'); // Importar Axios para realizar solicitudes HTTP
const correoService = require('../SendMail');
const { gql } = require('graphql-tag'); // Importar gql de graphql-tag

const app = express();

async function obtenerCorreoDelUsuario(id) {
  // Definir la consulta GraphQL
  const query = gql`
    query getUserEmailById($id: String!) {
      getUserEmailById(id: $id) {
        msg
        email
      }
    }
  `;
  try {
    const response = await axios.post('http://localhost:4000/', {
      query: query.loc.source.body,
      variables: { id: id }, 
    });
    const email = response.data.data.getUserEmailById.email;
    return email;
  } catch (error) {
    console.error('Error al obtener el correo del usuario:', error);
    throw error; 
  }
}

// Función para transformar una hora en formato digital 00:00 a una hora en formato cron
function obtenerHoraCron(hora, dia) {
  let [horaStr, minutoStr] = hora.split(':');
  let horaNum = parseInt(horaStr, 10);
  let minutoNum = parseInt(minutoStr, 10);
  minutoNum = minutoNum - 10;
  if (minutoNum < 0) {
    minutoNum = 60 + minutoNum;
    horaNum = horaNum - 1;
    if (horaNum < 0) {
      horaNum = 24 + horaNum;
    }
  }
  return `${minutoNum} ${horaNum} * * ${dia}`;
}

// Configuración de la solicitud GraphQL
app.post('/notificar/:id', async (req, res) => {
  const correo = await obtenerCorreoDelUsuario(req.params.id);

  // Definir la consulta GraphQL utilizando gql
  const query = `
    query {
      routineUser(ID: "${req.params.id}") {
        dias_semana {
          Duracion_Max
          Hora_inicio
          dia
          ejercicios
        }
      }
    }`;

  // Realizar la solicitud GraphQL usando Axios
  axios({
    url: 'http://localhost:4000/', // URL de la API GraphQL
    method: 'post',
    data: {
      query: query, // Cambiado de typeDefs a query
    },
  })
    .then((response) => {
      const routineUserData = response.data.data.routineUser;

      // Obtener el día de la semana actual
      const fechaActual = new Date();
      let diaDeLaSemana = fechaActual.getDay();
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const diaActual = diasSemana[diaDeLaSemana];

      // Si hay ejercicios programados para el día, notificar con 10 minutos de anticipación
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
        const horaCron = obtenerHoraCron(horaInicio, diaDeLaSemana);

        cron.schedule(horaCron, () => {
          console.log('Notificación enviada');
          // Enviar correo usando la funcionalidad creada en el archivo SendMail.js
          correoService.enviarCorreo(correo, 'Recordatorio de Ejercicios', 'Hola, recuerda que tienes ejercicios dentro de 10 minutos');
        }, {
          scheduled: true,
          timezone: 'America/Bogota',
        });

        res.json({ mensaje: 'Notificación programada con éxito' });
      } else {
        console.log('No hay ejercicios para notificar');
      }
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud:', error);
    });
});

module.exports = app;
