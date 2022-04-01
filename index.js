require('dotenv').config(); // import dotenv

const express = require('express'); // import express
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

// Rutas
app.use('/api/usuarios', require('./routes/usuarios')); // import routes from usuarios.js
app.use('/api/login', require('./routes/auth')); // import routes from usuarios.js

app.listen(process.env.PORT, () => {
    console.log('listening on port' + process.env.PORT);    // listen process.env.PORT
});


// username = 'Richard_Vargas';
// password = 'Dq7v9YIsMueuJeAy';