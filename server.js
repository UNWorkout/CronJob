const express = require('express');
const router = require('./routers/index.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Cors Configuration
const corsOptions = { origin : ['http://127.0.0.1:5173'] };
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api', router);
app.use('/', express.static('public'));

try {
	app.listen(port, () => {
		console.log(`🚀 Server Started! Listening on Port ${port}`);
	});
} catch (err) {
	console.error('❌ Could not start the server!', err);
}
