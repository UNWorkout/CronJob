
const cron = require('node-cron');
const { EnviarEmail } = require('../utils/index.js');

async function NotificarRutina(req, res) {
    const{
        email,
        dias_semana,
    } = req.body;
    if (!email || !dias_semana) {
        return res.status(400).json({
            msg: 'Datos incompletos'
        });
    }
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
    const fechaActual = new Date();
    let diaDeLaSemana = fechaActual.getDay();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaActual = diasSemana[diaDeLaSemana];
    let val = false;
    for (let i = 0; i < dias_semana.length; i++) {
        if (dias_semana[i].dia == diaActual) {
        diaDeLaSemana = i;
        val = true;
        break;
        }
    }
    if (val && dias_semana[diaDeLaSemana].ejercicios.length > 0) {
        const horaInicio = dias_semana[diaDeLaSemana].Hora_inicio;
        const horaCron = obtenerHoraCron(horaInicio, diaDeLaSemana);
        cron.schedule(horaCron, () => {
            EnviarEmail(email, 'Recordatorio de Ejercicios', 'Hola, recuerda que tienes ejercicios dentro de 10 minutos');
        }, {
            scheduled: true,
            timezone: 'America/Bogota',
        });
        res.json({ mensaje: 'Notificación programada con éxito' });
    } else {
        console.log('No hay ejercicios para notificar');
    }
}

async function SendMail(req, res) {
    const{
        destinatario,
        asunto,
        mensaje,
    } = req.body;
    if (!destinatario || !asunto || !mensaje){
        return res.status(400).json({
            msg: 'Datos incompletos'
        });
    }
    EnviarEmail(destinatario, asunto, mensaje);
}

module.exports = {
    NotificarRutina,
    SendMail,
};