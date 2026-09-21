const express = require('express');
const { port } = require('./config/env');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set({
        'X-API-Version': 'v1',
        'X-Content-Type-Options': 'nosniff'
    });

    if (req.get('X-API-Key')) {
        res.set('X-API-Key-Received', 'true');
    }

    return next();
});

app.get('/', (req, res) => {
    res.send('Hola, mi servidor Express esta funcionando.');
});

app.use('/api', routes);

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            error: 'JSON malformado',
            message: 'Verifica la sintaxis del JSON enviado'
        });
    }

    return res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});