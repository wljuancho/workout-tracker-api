import express from 'express';
import { port } from './config/env.js';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    return next(error);
});

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});