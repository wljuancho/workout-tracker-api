const express = require('express');
const { port } = require('./config/env');

const app = express();

app.get('/', (req, res) => {
    res.send('Hola, mi servidor Express esta funcionando.');
});

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});