import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';
import sequelize from './database.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

const PORT = 5000;

// Sincroniza la base de datos y levanta el servidor
sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
});
