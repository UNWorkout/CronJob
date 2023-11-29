const nodemailer = require('nodemailer');

async function EnviarEmail(destinatario, asunto, mensaje) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: '4jcarquisoft@gmail.com',
                pass: 'fnfzmdqpccxvseyg',
            },
        });
        const opcionesCorreo = {
        from: '4jcarquisoft@gmail.com', 
        to: destinatario, // El destinatario del correo
        subject: asunto, // El asunto del correo
        text: mensaje, // El contenido del correo
        };
        // Envía el correo electrónico
        transporter.sendMail(opcionesCorreo, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = {
    EnviarEmail,
};
