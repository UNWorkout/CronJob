
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
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
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
        return res.status(200).json({
            'msg':`Notificación programada con éxito`,
        })
    } else {
        return res.status(500).json({
            'msg':`No hay ejercicios programados para hoy`,
        })
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
    try {
        const info = await EnviarEmail(destinatario, asunto, mensaje);
        return res.status(200).json({
            msg: 'Correo enviado exitosamente',
            info: info.response,
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Correo no pudo ser enviado',
            error: error.message,
        });
    }
}

module.exports = {
    NotificarRutina,
    SendMail,
};