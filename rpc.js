const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 51473;

app.use(bodyParser.json());

const RPC_URL = 'http://127.0.0.1:51473/';
const RPC_USER = 'divimonstruo';
const RPC_PASSWORD = 'divipachuli123';

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(RPC_URL, req.body, {
      auth: {
        username: RPC_USER,
        password: RPC_PASSWORD
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error en el proxy:', error.message);
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy escuchando en http://localhost:${PORT}`);
});
