const express = require('express');
const { NotificarRutina, SendMail } = require('../controllers/index.js');

const router = express.Router();

router.post('/cronjob', NotificarRutina);
router.post('/enviar', SendMail);

module.exports = router;