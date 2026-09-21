const express = require('express');
const { port } = require('./config/env');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola, mi servidor Express esta funcionando.');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});