const express = require('express'); // import express

require('dotenv').config(); // import dotenv

const cors = require('cors'); // import cors

const { dbConnection } = require('./database/config'); // import dbConnection from config.js

// Crear server de express
const app = express(); // create an instance of express

// Configuración de CORS
app.use(cors()); // enable cors

// Lectura y parseo del body
app.use(express.json()); // enable json

// Base de datos
dbConnection(); // connect to database

// Directorio publico
app.use(express.static('public')); // enable static files

// Rutas
app.use('/api/usuarios', require('./routes/usuarios')); // import routes from usuarios.js
app.use('/api/hospitales', require('./routes/hospitales')); // import routes from hospitales.js
app.use('/api/medicos', require('./routes/medicos')); // import routes from usuarios.js
app.use('/api/todo', require('./routes/busquedas')); // import routes from busquedas.js
app.use( '/api/login', require('./routes/auth') ); // import routes from usuarios.js
app.use('/api/upload', require('./routes/upload')); // import routes from upload.js

app.listen(process.env.PORT, () => {
    console.log('listening on port' + process.env.PORT);    // listen process.env.PORT
});

// username = 'Richard_Vargas';
// password = 'Dq7v9YIsMueuJeAy';